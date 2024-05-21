import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const jsonFilePath = path.resolve('output.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
const jsonObject = JSON.parse(jsonData);

const data = [["键", "值"]]; // 列头
for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
        data.push([key, jsonObject[key]]);
    }
}
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
const outputFilePath = path.resolve('output.xlsx');
XLSX.writeFile(workbook, outputFilePath);
console.log(`XLSX 文件已导出到: ${outputFilePath}`);
