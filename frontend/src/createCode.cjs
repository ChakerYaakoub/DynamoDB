const fs = require('fs');
const path = require('path');
// to execute : 
// node src/createCode.cjs 
// This script will create a folder and files for each route in the appRoutes array 
// The folder will contain the following files:
// - use{RouteName}.ts
// - {RouteName}.css
// - {RouteName}.tsx
// Define the list of routes
// components
// pages 
const folder = 'pages'
const appRoutes = [

  { path: `${folder}/Edit`, title: 'Edit' },


];


// Function to create a folder and files for each route
const createRouteFiles = (route) => {
  const folderName = route.path;
  const folderPath = path.join(__dirname, folderName);

  // Create folder
  fs.mkdirSync(folderPath);

  // Replace special characters in title to create valid file names
  const fileName = route.title.replace(/[^a-zA-Z0-9]/g, '_');

  // Create use{RouteName}.ts
  const useTemplate = `export interface ${fileName}Props {}

export const use${fileName} = (props: ${fileName}Props) => {


  return { ...props };
};
`;
  fs.writeFileSync(path.join(folderPath, `use${fileName}.ts`), useTemplate);

  // Create {RouteName}.css
  fs.writeFileSync(path.join(folderPath, `${fileName}.css`), '/* Your CSS styles here */');

  // Create {RouteName}.tsx
  const tsxTemplate = `import React from 'react';
import './${fileName}.css';
import { ${fileName}Props, use${fileName} } from './use${fileName}';

const ${fileName}: React.FC = (props: ${fileName}Props) => {
  const {  } = use${fileName}(props);
  return <div>${route.title}</div>;
};

export default ${fileName};
`;
  fs.writeFileSync(path.join(folderPath, `${fileName}.tsx`), tsxTemplate);
};

// Create files for each route
appRoutes.forEach((route) => createRouteFiles(route));
