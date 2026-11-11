const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test');

async function excelTest(searchText,replacedValue,change,filePath){
    
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
        
    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replacedValue;
    await workbook.xlsx.writeFile(filePath);
        
}

async function readExcel(worksheet,searchText){
    let output = {row:-1,column:-1};
     worksheet.eachRow((row,rowNumber)=>
        {

            row.eachCell((cell,colNumber)=>{    
                //console.log(cell.value);
                if(cell.value === searchText)
                    {
                    console.log(rowNumber,colNumber);
                    //console.log(colNumber);
                        output.row = rowNumber;
                        output.column = colNumber;
                    }

                })

        })
    
        return output;
}
//excelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/MY PC/Downloads/excelDownloadTest.xlsx");

test('Upload Download Excel Verification',async({page})=>
    {   
        const textSearch = "Mango";
        const updatedValue = "500";
        const filePath = "C:/Users/MY PC/Downloads/download.xlsx";
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const downloadPromise = page.waitForEvent('download');
        await page.locator("#downloadButton").click();
        const download = await downloadPromise;
        await download.saveAs(filePath);
        await excelTest("Mango",updatedValue,{rowChange:0,colChange:2},filePath);
        await page.locator("#fileinput").click();
        await page.locator("#fileinput").setInputFiles(filePath);

        const textLocator = page.getByText(textSearch);
        const desiredRow = page.getByRole('row').filter({has : textLocator});
        await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);


    })


                




