import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatListOption } from '@angular/material/list';

export class PeriodicElement {
  id!: number;
  name!: string;
  descricao!: string;
  unMedida!: string;
  tipo!: string;
  qtd!: number;
  valorUn!: number;
  valorTotal!: number;
  fornecedor!: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    name: 'Hydrogen',
    qtd: 109,
    descricao: 'H',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 10.95,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 2,
    name: 'Helium',
    qtd: 41,
    descricao: 'He',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 5.6,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 3,
    name: 'Lithium',
    qtd: 62,
    descricao: 'Li',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 7.49,
    valorTotal: 0,
    fornecedor:'ABC'
  },
];

let ELEMENTS: PeriodicElement[] = [
  {
    id: 1,
    name: 'Hydrogen',
    qtd: 109,
    descricao: 'H',
    tipo:'Insumo',
    unMedida: 'Unidade',
    valorUn: 10.95,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 2,
    name: 'Helium',
    qtd: 41,
    descricao: 'He',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 5.6,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 3,
    name: 'Lithium',
    qtd: 62,
    descricao: 'Li',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 7.49,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 4,
    name: 'Beryllium',
    qtd: 93,
    descricao: 'Be',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 1.99,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 5,
    name: 'Boron',
    qtd: 104,
    descricao: 'B',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 5.83,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 6,
    name: 'Carbon',
    qtd: 125,
    descricao: 'C',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 6.77,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 7,
    name: 'Nitrogen',
    qtd: 146,
    descricao: 'N',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 7.11,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 8,
    name: 'Oxygen',
    qtd: 157,
    descricao: 'O',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 8.33,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 9,
    name: 'Fluorine',
    qtd: 188,
    descricao: 'F',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 3.94,
    valorTotal: 0,
    fornecedor:'ABC'
  },
  {
    id: 10,
    name: 'Neon',
    qtd: 200,
    descricao: 'Ne',
    unMedida: 'Unidade',
    tipo:'Insumo',
    valorUn: 9.27,
    valorTotal: 0,
    fornecedor:'ABC'
  },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    ELEMENT_DATA.map((a) => {
      a.valorTotal = a.qtd * a.valorUn;
      return a;
    });
  }

  data_produto = ELEMENTS;
  data_estoque = ELEMENT_DATA;
  data_estoque_vlTotal = ELEMENT_DATA.map((a) => {
    a.valorTotal;
  });
  itemEntrada: PeriodicElement[] = [];
  itemEntradaList: PeriodicElement[] = [];
  itemSaida: PeriodicElement[] = [];
  itemSaidaList: PeriodicElement[] = [];
  itemSelected!: PeriodicElement;

  constructor(private _snackBar: MatSnackBar) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'descricao',
    'unMedida',
    'tipo',
    'valorUn',
    'qtd',
    'fornecedor',
    'valorTotal',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  nfGroup: FormGroup = new FormGroup({
    nf: new FormControl('', Validators.required),
    dataNf: new FormControl('', Validators.required),
    fornecedor: new FormControl('', Validators.required),
  });

  produto: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    unMedida: new FormControl('', Validators.required),
    valorUn: new FormControl('', Validators.min(0)),
    tipo: new FormControl('', Validators.required),
    fornecedor: new FormControl('', Validators.required),
  });

  produtoEdit: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    unMedida: new FormControl('', Validators.required),
    valorUn: new FormControl('', Validators.min(0)),
    tipo: new FormControl('', Validators.required),
    fornecedor: new FormControl('', Validators.required),
  });

  getTotal() {
    return this.data_estoque
      .map((t) => t.valorTotal)
      .reduce((acc, value) => acc + value, 0);
  }
  getTotalQtd() {
    return this.data_estoque
      .map((t) => t.qtd)
      .reduce((acc, value) => acc + value, 0);
  }

  createProd() {
    var a = this.produto.value
    a.id = ELEMENTS.length +1
    this.data_produto.push(a);

    this.produto = new FormGroup({
      name: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      unMedida: new FormControl('', Validators.required),
      valorUn: new FormControl('', Validators.min(0)),
      tipo: new FormControl('', Validators.required),
      fornecedor: new FormControl('', Validators.required),
    });
  }

  editProd(item: PeriodicElement){
    this.produtoEdit = new FormGroup({
      
      id: new FormControl(item.id),
      name: new FormControl(item.name, Validators.required),
      descricao: new FormControl(item.descricao, Validators.required),
      unMedida: new FormControl(item.unMedida, Validators.required),
      valorUn: new FormControl(item.valorUn, Validators.min(0)),
      tipo: new FormControl(item.tipo, Validators.required),
      fornecedor: new FormControl(item.fornecedor, Validators.required),
    });
  }

  
  alteraProd(item: PeriodicElement){
    console.log(item)
    ELEMENTS.map(a=>{
      if(a.id== item.id){
        a.name = item.name
        a.descricao = item.descricao
        a.unMedida = item.unMedida
        a.tipo = item.tipo
        a.qtd = item.qtd
        a.valorUn = item.valorUn
        console.log(a)
      }
    })
    ELEMENT_DATA.map(a=>{
      if(a.id== item.id){
        a.name = item.name
        a.descricao = item.descricao
        a.unMedida = item.unMedida
        a.tipo = item.tipo
      a.valorUn = item.valorUn
        console.log(a)
      }
    })
    console.log(ELEMENTS)
    this.refreshDash()
  }

  selectProdSaida(selects: MatListOption[]) {
    console.log(selects.map((o: { value: any }) => o.value))
    this.itemSaida = selects.map((o: { value: any }) => o.value);    
  }

  selectProdEntrada(selects: MatListOption[]) {
    this.itemEntrada = [] 
    this.itemEntrada = selects.map((o: { value: any }) => o.value);
}

  incluir() {
    console.log(this.itemEntradaList);
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
    this.itemEntradaList = [];
    this.itemEntrada = [];
  }

  refreshDash() {
    this.nfGroup = new FormGroup({
      nf: new FormControl('', Validators.required),
      dataNf: new FormControl('', Validators.required),
      fornecedor: new FormControl('', Validators.required),
    });
  
    this.produto = new FormGroup({
      name: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      unMedida: new FormControl('', Validators.required),
      valorUn: new FormControl('', Validators.min(0)),
      tipo: new FormControl('', Validators.required),
      fornecedor: new FormControl('', Validators.required),
    });

    this.dataSource.sort = this.sort;
    console.log(this.sort);
    ELEMENT_DATA.sort();
    for (var i in ELEMENT_DATA) {
      var index: number = +i;

      if (ELEMENT_DATA[i].qtd == 0) {
        ELEMENT_DATA.splice(index, 1);
      }
      console.log(ELEMENT_DATA);
      console.log(index);
    }
    for (var i in ELEMENT_DATA) {
      var index: number = +i;

      if (ELEMENT_DATA[i].qtd == 0) {
        ELEMENT_DATA.splice(index, 1);
      }
      console.log(ELEMENT_DATA);
      console.log(index);
    }

    ELEMENT_DATA.map((a) => {
      a.valorTotal = a.qtd * a.valorUn;
      return a;
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.ngAfterViewInit();

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

    for (let i = 0; i < ELEMENT_DATA.length; i++) {
      if (
        this.itemSaidaList.filter((a) => a.id == this.itemSelected.id).length ==
        0
      ) {
        // a = this.itemSelected;
        // console.log('push');
        this.itemSaidaList.push(this.itemSelected);
      } else {
        // console.log("else")
        // console.log(this.itemSelected)
        this.itemSaidaList.map((a) => {
          if (a.id == this.itemSelected.id) {
            if (a.qtd !== this.itemSelected.qtd) {
              console.log('foreach', this.itemSaidaList);
              // console.log("foreach Item",this.itemSelected)
              a.qtd = this.itemSelected.qtd;
            }
          }
        });
      }
    }
  }
  excluirSaida(item: PeriodicElement) {
    for (var i in this.itemSaida) {
      var index: number = +i;

      if (this.itemSaida[i].id == item.id) {
        this.itemSaida.splice(index, 1);
      }
    }
    for (var i in this.itemSaida) {
      var index: number = +i;

      if (this.itemSaida[i].id == item.id) {
        this.itemSaida.splice(index, 1);
      }
    }
   
  }

  excluirEntrada(item: PeriodicElement) {
    for (var i in this.itemEntrada) {
      var index: number = +i;

      if (this.itemEntrada[i].id == item.id) {
        this.itemSaida.splice(index, 1);
      }
    }
    for (var i in this.itemEntrada) {
      var index: number = +i;

      if (this.itemEntrada[i].id == item.id) {
        this.itemEntrada.splice(index, 1);
      }
    }
  }

  entradaQtd(itemSelect: PeriodicElement, qtd: string) {
    this.itemSelected = new PeriodicElement();
    this.itemSelected.id = itemSelect.id;
    this.itemSelected.name = itemSelect.name;
    this.itemSelected.descricao = itemSelect.descricao;
    this.itemSelected.qtd = +qtd;
    this.itemSelected.valorUn = itemSelect.valorUn;
    this.itemSelected.unMedida = itemSelect.unMedida;
    this.itemSelected.tipo = itemSelect.tipo;
    this.itemSelected.fornecedor = itemSelect.fornecedor;

    for (let i = 0; i < ELEMENT_DATA.length; i++) {
      if (
        this.itemEntradaList.filter((a) => a.id == this.itemSelected.id)
          .length == 0
      ) {
        // a = this.itemSelected;
        // console.log('push');
        this.itemEntradaList.push(this.itemSelected);
      } else {
        // console.log("else")
        // console.log(this.itemSelected)
        this.itemEntradaList.map((a) => {
          if (a.id == this.itemSelected.id) {
            if (a.qtd !== this.itemSelected.qtd) {
              console.log('foreach', this.itemEntradaList);
              // console.log("foreach Item",this.itemSelected)
              a.qtd = this.itemSelected.qtd;
            }
          }
        });
      }
    }
    console.log(this.itemEntradaList);
  }

  filter(obj:string){
    this.dataSource.filter = obj.trim().toLocaleLowerCase()
    this.refreshDash
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
