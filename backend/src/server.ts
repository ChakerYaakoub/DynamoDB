import express, { Request, Response } from "express";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import dotenv from "dotenv";

// to run the server :
//==>  npx ts-node src/server.ts

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// AWS Configuration
const dynamoDBClient = new DynamoDBClient({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

// Define Student Type
interface Student {
  StudentID: string;
  Name: string;
  Specialization: string;
  Email: string;
  Description?: string;
  DateOfBirth?: string;
}

// --------------------------------- Create Table ---------------------------------

// Function to create the Students table if it doesn't exist
const createTableIfNotExists = async () => {
  const params = {
    TableName: "Students",
    KeySchema: [{ AttributeName: "StudentID", KeyType: "HASH" }], // Partition key
    AttributeDefinitions: [
      { AttributeName: "StudentID", AttributeType: "S" }, // String type
      { AttributeName: "Specialization", AttributeType: "S" }, // Add Specialization attribute
      //   { AttributeName: "Name", AttributeType: "S" },
      //   { AttributeName: "Description", AttributeType: "S" },
      //   { AttributeName: "DateOfBirth", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: "SpecializationIndex", // Name of the GSI
        KeySchema: [{ AttributeName: "Specialization", KeyType: "HASH" }], // Partition key for GSI
        Projection: { ProjectionType: "ALL" }, // Include all attributes
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
  };

  try {
    // @ts-ignore
    await dynamoDBClient.send(new CreateTableCommand(params));
    console.log("Table created successfully");
  } catch (err: any) {
    if (err.name !== "ResourceInUseException") {
      console.error("Error creating table:", err);
    } else {
      console.log("Table already exists");
    }
  }
};

// Call the function to ensure the table exists
createTableIfNotExists();

// --------------------------------- Routes ---------------------------------

// ------ Fetch All Students ------
app.get("/students", async (req: Request, res: Response) => {
  const params = { TableName: "Students" };

  try {
    const data = await docClient.send(new ScanCommand(params));
    const students: Student[] = data.Items as Student[]; // Cast to Student array
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load students" });
  }
});
// ------ get student by id ------
app.get("/students/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const params = {
    TableName: "Students",
    Key: { StudentID: id },
  };
  try {
    const data = await docClient.send(new GetCommand(params));
    res.json(data.Item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load student" });
  }
});

// ------ Add a Student ------
app.post("/students", async (req: Request, res: Response) => {
  const student: Student = {
    Name: req.body.Name || "",
    Email: req.body.Email || "",
    Specialization: req.body.Specialization || "",
    Description: req.body.Description || "",
    DateOfBirth: req.body.DateOfBirth || "",
    StudentID: uuidv4(), // Generate a new StudentID
  };

  const params = {
    TableName: "Students",
    Item: student,
  };

  try {
    await docClient.send(new PutCommand(params));
    console.log("add student :", student.StudentID);
    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not add student" });
  }
});

// ------ Update a Student ------
app.put("/students/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedStudent: Partial<Student> = req.body; // Use Partial<Student> for updates

  const params = {
    TableName: "Students",
    Key: { StudentID: id },
    UpdateExpression:
      "set #name = :name, Specialization = :specialization, Email = :email, Description = :description, DateOfBirth = :dateOfBirth",
    ExpressionAttributeNames: { "#name": "Name" },
    ExpressionAttributeValues: {
      ":name": updatedStudent.Name,
      ":specialization": updatedStudent.Specialization,
      ":email": updatedStudent.Email,
      ":description": updatedStudent.Description || "",
      ":dateOfBirth": updatedStudent.DateOfBirth || "",
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    // @ts-ignore
    const data = await docClient.send(new UpdateCommand(params));
    console.log("update student :", id);
    res.json(data.Attributes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update student" });
  }
});

// ------ Delete a Student ------
app.delete("/students/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const params = {
    TableName: "Students",
    Key: { StudentID: id },
  };

  try {
    await docClient.send(new DeleteCommand(params));
    console.log("delete student :", id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete student" });
  }
});

// ------ Search Students by Specialization ------
// @ts-ignore
app.get(
  "/students/specialization/:specialization",
  // @ts-ignore
  async (req: Request, res: Response) => {
    const { specialization } = req.params;

    if (!specialization) {
      return res.status(400).json({ error: "Specialization is required" });
    }

    const decodedSpecialization = decodeURIComponent(specialization);

    const params = {
      TableName: "Students",
      IndexName: "SpecializationIndex",
      KeyConditionExpression: "#spec = :specialization",
      ExpressionAttributeNames: { "#spec": "Specialization" },
      ExpressionAttributeValues: { ":specialization": decodedSpecialization },
    };

    try {
      const data = await docClient.send(new QueryCommand(params));
      res.json(data.Items || []); // Return empty array if no items found
      console.log("search students by specialization :", specialization);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Could not search students by specialization" });
    }
  }
);

// --------------------------------- Server ---------------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
