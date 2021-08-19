import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';

export class PeriodicElement {
  id!: number;
  name!: string;
  descricao!: string;
  unMedida!: string;
  qtd!: number;
  valorUn!: number;
  valorTotal!: number;
}

let ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', qtd: 10, descricao: 'H' ,unMedida:'Unidade',valorUn:10,valorTotal:0},
  { id: 2, name: 'Helium', qtd: 40, descricao: 'He' ,unMedida:'Unidade',valorUn:5,valorTotal:0},
  { id: 3, name: 'Lithium', qtd: 70, descricao: 'Li',unMedida:'Unidade',valorUn:7,valorTotal:0},
];

const ELEMENTS: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', qtd: 1.0079, descricao: 'H',unMedida:'Unidade',valorUn:10,valorTotal:0},
  {id: 2, name: 'Helium', qtd: 4.0026, descricao: 'He',unMedida:'Unidade',valorUn:5,valorTotal:0},
  {id: 3, name: 'Lithium', qtd: 6.941, descricao: 'Li',unMedida:'Unidade',valorUn:7,valorTotal:0},
  {id: 4, name: 'Beryllium', qtd: 9.0122, descricao: 'Be',unMedida:'Unidade',valorUn:1,valorTotal:0},
  {id: 5, name: 'Boron', qtd: 10.811, descricao: 'B',unMedida:'Unidade',valorUn:5,valorTotal:0},
  {id: 6, name: 'Carbon', qtd: 12.0107, descricao: 'C',unMedida:'Unidade',valorUn:6,valorTotal:0},
  {id: 7, name: 'Nitrogen', qtd: 14.0067, descricao: 'N',unMedida:'Unidade',valorUn:7,valorTotal:0},
  {id: 8, name: 'Oxygen', qtd: 15.9994, descricao: 'O',unMedida:'Unidade',valorUn:8,valorTotal:0},
  {id: 9, name: 'Fluorine', qtd: 18.9984, descricao: 'F',unMedida:'Unidade',valorUn:3,valorTotal:0},
  {id: 10, name: 'Neon', qtd: 20.1797, descricao: 'Ne',unMedida:'Unidade',valorUn:9,valorTotal:0},
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  

  data_produto = ELEMENTS;
  data_estoque = ELEMENT_DATA
  itemEntrada: PeriodicElement[] = [];
  itemEntradaList: PeriodicElement[] = [];
  itemSaida: PeriodicElement[] = [];
  itemSaidaList: PeriodicElement[] = [];
  itemSelected!: PeriodicElement;

  constructor(private _snackBar: MatSnackBar) {}

  displayedColumns: string[] = ['id', 'name',  'descricao','unMedida','valorUn','qtd','valorTotal'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  nfGroup: FormGroup = new FormGroup({
    nf: new FormControl('', Validators.required),
    produtos: new FormControl([], Validators.required),
    dataNf: new FormControl('', Validators.required),
    fornecedor: new FormControl('', Validators.required),
  });

  produtos: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nome: new FormControl([], Validators.required),
    descricao: new FormControl('', Validators.required),
    qtd: new FormControl('', Validators.required),
    unMedida: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    ELEMENT_DATA.map(a=>{
      a.valorTotal = a.qtd * a.valorUn
      return a
    });
  }

  

  teste(){
    var a = {id: 11, name: 'teste', qtd: 0, descricao: 'H1',unMedida:'Unidade',valorUn:9,valorTotal:0}
    this.data_produto.push(a)
  }

  selectProdSaida(item: PeriodicElement) {
  
    if (
      this.itemSaida.filter((b) => {
        if (b.id == item.id) {
          return b;
        }
        return;
      }).length > 0
    ) {
      this._snackBar.open(
        'Produto já incluido',
        `Produto ID: ${item.id.toString()}`,
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    } else {
      ELEMENT_DATA.filter(a=>{
      if(a.id == item.id){
        item.qtd = a.qtd
      }  
      })
        
      
      this.itemSaida.push(item);
    }
  }

  selectProdEntrada(item: PeriodicElement) {
    item.qtd =0
    if (
      this.itemEntrada.filter((b) => {
        if (b.id == item.id) {
          return b;
        }
        return;
      }).length > 0
    ) {
      this._snackBar.open(
        'Produto já incluido',
        `Produto ID: ${item.id.toString()}`,
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    } else {
      ELEMENT_DATA.filter(a=>{
      if(a.id == item.id){
        item.qtd = a.qtd
      }  
      })
        
      
      this.itemEntrada.push(item);
    }
  }

  incluir() {
    console.log(this.itemEntradaList)
    this.itemEntradaList.forEach((a) => {
      if (
        ELEMENT_DATA.filter((b) => {
          if (b.id == a.id) {
            return b;
          }
          return;
        }).length > 0
      ) {
        ELEMENT_DATA.map((b) => {
          if (b.id == a.id) {
            console.log(a);
            b.qtd = b.qtd + a.qtd;
          }
        });
      } else {
        ELEMENT_DATA.push(a);
      }
    });
    this.refreshDash();
    this.itemEntradaList=[]
    this.itemEntrada = [];
  }

  refreshDash() {
    ELEMENT_DATA.sort()
    for(var i in ELEMENT_DATA){
      var index:number = +i
      
        if (ELEMENT_DATA[i].qtd == 0) {
          ELEMENT_DATA.splice(index, 1);
        }
        console.log(ELEMENT_DATA)
        console.log(index)
      
    }
    for(var i in ELEMENT_DATA){
      var index:number = +i
      
        if (ELEMENT_DATA[i].qtd == 0) {
          ELEMENT_DATA.splice(index, 1);
        }
        console.log(ELEMENT_DATA)
        console.log(index)
      
    }

    ELEMENT_DATA.map(a=>{
      a.valorTotal = a.qtd * a.valorUn
      return a
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    let chartOptionsUpdate: Highcharts.Options = {
      title: {
        text: 'Estoque',
      },
      xAxis: {
        categories: ELEMENT_DATA.map((a) => a.name),
      },
      yAxis: {
        title: {
          text: 'Quantidade',
        },
      },
      series: [
        {
          name: 'Estoque',
          data: ELEMENT_DATA.map((a) => a.qtd),
          type: 'column',
        },
      ],
    };
    this.chartOptions = chartOptionsUpdate;
  }
  saida() {
    this.itemSaidaList.forEach((a) => {
      if (
        ELEMENT_DATA.filter((b) => {
          if (b.id == a.id) {
            return b;
          }
          return;
        }).length >= 0
      ) {
        ELEMENT_DATA.map((b) => {
          if (b.id == a.id) {
            // console.log(a);
            b.qtd = b.qtd - a.qtd;
          }
        });
      } else {
        // ELEMENT_DATA.(a);
      }
    });
    this.refreshDash();

    this.itemSaida = [];
    this.itemSaidaList = [];
  }

  saidaQtd(itemSelect: PeriodicElement, qtd: string) {

    this.itemSelected = new PeriodicElement();
    this.itemSelected.id = itemSelect.id;
    this.itemSelected.name = itemSelect.name;
    this.itemSelected.descricao = itemSelect.descricao;
    this.itemSelected.qtd = +qtd;
   
    for (let i =0;i<ELEMENT_DATA.length;i++){
      if (this.itemSaidaList.filter(a =>a.id == this.itemSelected.id).length==0) {
        // a = this.itemSelected;
        // console.log('push');
        this.itemSaidaList.push(this.itemSelected);
      } 
      else {
        // console.log("else")
        // console.log(this.itemSelected)
        this.itemSaidaList.map(a =>{
          if(a.id == this.itemSelected.id){

            if(a.qtd !== this.itemSelected.qtd){
              console.log("foreach",this.itemSaidaList)
              // console.log("foreach Item",this.itemSelected)
              a.qtd = this.itemSelected.qtd
            }
          }
      })
        
      }
    }
  }

  entradaQtd(itemSelect: PeriodicElement, qtd: string) {

    this.itemSelected = new PeriodicElement
    this.itemSelected.id = itemSelect.id;
    this.itemSelected.name = itemSelect.name;
    this.itemSelected.descricao = itemSelect.descricao;
    this.itemSelected.qtd = +qtd;
    this.itemSelected.valorUn = itemSelect.valorUn;
    this.itemSelected.unMedida = itemSelect.unMedida;
   
    for (let i =0;i<ELEMENT_DATA.length;i++){
      if (this.itemEntradaList.filter(a =>a.id == this.itemSelected.id).length==0) {
        // a = this.itemSelected;
        // console.log('push');
        this.itemEntradaList.push(this.itemSelected);
      } 
      else {
        // console.log("else")
        // console.log(this.itemSelected)
        this.itemEntradaList.map(a =>{
          if(a.id == this.itemSelected.id){

            if(a.qtd !== this.itemSelected.qtd){
              console.log("foreach",this.itemEntradaList)
              // console.log("foreach Item",this.itemSelected)
              a.qtd = this.itemSelected.qtd
            }
          }
      })
        
      }
    }
    console.log(this.itemEntradaList)
  }


  highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Estoque',
    },
    xAxis: {
      categories: ELEMENT_DATA.map((a) => a.name),
    },
    yAxis: {
      title: {
        text: 'Quantidade',
      },
    },
    series: [
      {
        name: 'Estoque',
        data: ELEMENT_DATA.map((a) => a.qtd),
        type: 'column',
      },
    ],
  };
}
