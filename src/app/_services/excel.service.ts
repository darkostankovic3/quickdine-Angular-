import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(
    private toastr: ToastrService
  ) { }

  export(config) {
    const fileName = config.fileName;
    const wsName = config.sheetName;
    const resData = config.data;

    // Add title
    resData.splice(0, 0, config.titles);

    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.aoa_to_sheet(resData);

    /* add worksheet to workbook */
    XLSX.utils.book_append_sheet(workBook, workSheet, wsName);

    /* write workbook */
    XLSX.writeFile(workBook, fileName);
  }


  importExcel(files, callbackHandle) {
    const existFileReader = typeof FileReader !== 'undefined';
    if (!existFileReader) {
      this.toastr.error('FileReader are not supported in this browser.', 'Error');
      return [];
    }

    const existReadAsBinaryString = typeof FileReader !== 'undefined' &&
      typeof FileReader.prototype !== 'undefined' &&
      typeof FileReader.prototype.readAsBinaryString !== 'undefined';
    if (!existReadAsBinaryString) {
      callbackHandle([]);
      return [];
    }

    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);

    // Handle onload
    reader.onload = (event: ProgressEvent) => {
      if (!event.target) {
        this.toastr.error('Not exist EventTarget', 'Error');
        return false;
      }

      const target = <FileReader> event.target;
      const binaryData = XLSX.read(target.result, {type: 'binary'});
      const sheetData = binaryData.Sheets[binaryData.SheetNames[0]];
      const arrayResult = XLSX.utils.sheet_to_json(sheetData);

      callbackHandle(arrayResult);
    };

    // Handle errors
    reader.onerror = (event) => {
      this.toastr.error('Can\'t read file !', 'Error');
      console.log(event);
    };
  }


}
