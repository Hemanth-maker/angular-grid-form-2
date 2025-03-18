import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userForm: FormGroup;
  savedData: any = null;
  showGridOrFormVal =  'Show Form'
  visibleGridOrForm : boolean =  true
  showOrHideColumnList: any[] = [];
  selectedRowData: any[] = [];
  private gridApi: any;
  private gridColumnApi: any;

  rowData = [
    { id: 997, ruleName: "2DS - Trace Changes", active: "Y", type: "Match", subType: "2DS - Trace Changes", domain: "", impacted: 0, favourite: "N", scheduled: "Y", lastScheduledDate: "01-May-2024 01:15 PM", alert: "Y" },
    { id: 996, ruleName: "Trace Changes", active: "Y", type: "Match", subType: "2DS - Trace Changes", domain: "", impacted: 0, favourite: "N", scheduled: "N", lastScheduledDate: "01-May-2024 01:15 PM", alert: "N" },
    { id: 986, ruleName: "File Monitor", active: "Y", type: "Match", subType: "1DS - File Monitor", domain: "", impacted: 57994, favourite: "N", scheduled: "Y", lastScheduledDate: "01-May-2024 01:15 PM", alert: "Y" },
    { id: 985, ruleName: "testreve1", active: "Y", type: "Match", subType: "1DS - File Monitor", domain: "", impacted: 13773, favourite: "N", scheduled: "N", lastScheduledDate: "01-May-2024 01:15 PM", alert: "N" }
  ];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, width : 100 },
    { field: 'ruleName', headerName: 'Rule Name', sortable: true, filter: true , width : 200},
    { field: 'active', headerName: 'Active', sortable: true, filter: true , width : 125},
    { field: 'type', headerName: 'Type', sortable: true, filter: true , width : 100},
    { field: 'subType', headerName: 'Sub Type', sortable: true, filter: true , width : 250},
    { field: 'impacted', headerName: 'Impacted Records', sortable: true, filter: true, hide: false , width : 150},
    { field: 'scheduled', headerName: 'Scheduled', sortable: true, filter: true , width : 125},
    { field: 'lastScheduledDate', headerName: 'Last Scheduled Date', sortable: true, filter: true , width : 250},
    { field: 'alert', headerName: 'Alert', sortable: true, filter: true, width : 125 }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    if (this.gridApi) {
      this.showOrHideColumnList = this.columnDefs.map((col) => col.field);
    }
  }
  
  onCheckboxChange(event: Event, columnName: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggleColumnVisibility(columnName, isChecked);
  }

  toggleColumnVisibility(columnName: string, isVisible: boolean) {
    if (!this.gridApi) return; 
  
    this.gridApi.setColumnsVisible([columnName], isVisible);
  }
  

  isColumnVisible(columnName: string): boolean {
    if (!this.gridApi) return true; 
    const columnState = this.gridApi.getColumnState();
    if (!columnState) return true;
  
    return !columnState.find((col: { colId: string; }) => col.colId === columnName)?.hide;
  }
  

  onRowClick(event: any) {
    this.selectedRowData = event.api.getSelectedRows();
  }

  showGridOrFormFn(){
    if(this.visibleGridOrForm){
      this.visibleGridOrForm = !this.visibleGridOrForm
      this.showGridOrFormVal = 'Show Grid'
    }
    else {
      this.visibleGridOrForm = !this.visibleGridOrForm
      this.showGridOrFormVal = 'Show Form'
    }
    
  }

  saveData() {
    this.savedData = this.userForm.value;
    console.log('Saved Data:', this.savedData);
  }

  updateData() {
    if (this.savedData) {
      this.savedData = this.userForm.value;
      console.log('Updated Data:', this.savedData);
    } else {
      console.log('No data to update. Please save first.');
    }
  }

}
