import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

console.log("🚀  ", XLSX)

// 定义输入 XLSX 文件路径和输出 JSON 文件路径
const inputFilePath = path.resolve('./public/locales/zh/translation.xlsx');
const outputJsonFilePath = path.resolve('./public/locales/zh/output.json');

// 读取 XLSX 文件
const workbook = XLSX.readFile(inputFilePath);

// 假设数据在第一个工作表中
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 将工作表转换为 JSON 对象
const jsonArray = XLSX.utils.sheet_to_json(worksheet, {header: 1});

// 转换 JSON 数组为键值对对象
const jsonObject = {};
for (let i = 1; i < jsonArray.length; i++) {
    const [key, value] = jsonArray[i];
    jsonObject[key] = value;
}

// 将 JSON 对象写入文件
fs.writeFileSync(outputJsonFilePath, JSON.stringify(jsonObject, null, 2), 'utf8');

console.log(`JSON 文件已导出到: ${outputJsonFilePath}`);
