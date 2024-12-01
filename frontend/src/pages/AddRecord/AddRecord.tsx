import React from "react";
import "./AddRecord.css";
import { AddRecordProps, useAddRecord } from "./useAddRecord";
import AddStudent from "../../components/AddStudent/AddStudent";

const AddRecord: React.FC = (props: AddRecordProps) => {
  const {} = useAddRecord(props);
  return (
    <div>
      <AddStudent />
    </div>
  );
};

export default AddRecord;
