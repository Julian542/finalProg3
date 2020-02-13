import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { PersonaInterface } from 'src/app/modelo/persona';
import { PersonaserService } from 'src/app/servicios/personaser.service';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { error } from 'protractor';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  
  @ViewChild('btnClose',{static:true}) btnClose: ElementRef;

  personas: PersonaInterface[] = [];

  peopleForm:FormGroup;

  personaVacia: PersonaInterface ={id:null};

  indice:number;

  flag:boolean;

  public mensajeError;

  constructor(private service:PersonaserService, private fb : FormBuilder) { 
      this.formBuilder();
  }


  ngOnInit() {
    this.getAll();
  }

  formBuilder(){
    this.peopleForm = this.fb.group({
      'id': null,
      'nombre': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'apellido':new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'dni':new FormControl(0, [Validators.required, this.validadorDni, Validators.maxLength(8)])
    });
  }

  getAll(){
    this.service.getAll().subscribe(
      (data)=>{
      this.personas = data;
    },
    (error)=> {
      this.mensajeError = error;
      console.log(this.mensajeError);
    });
  }

  delete(persona){
    this.service.delete(persona.id).subscribe( data =>{
      alert('Registro eliminado');
      this.personas.splice( this.personas.indexOf(persona) ,1);
    },
    (error)=>{
      this.mensajeError = error;
      console.log(this.mensajeError);
    });
  }

  saveRegistro(values){

    if(values.id == null){
      this.service.post(values).subscribe( (data)=>{
        console.log(values);
        this.personas.push(data);      
        this.btnClose.nativeElement.click();
        },
        (error)=>{
          this.mensajeError = error;
          console.log(this.mensajeError);
        });
    }else{     
      this.service.put(values.id,values).subscribe( (data) =>{
        console.log(data)
        this.btnClose.nativeElement.click();
        this.flag = true;
      },
      (error)=>{
        this.mensajeError = error;
        console.log(this.mensajeError);
        this.flag = false;
      });
      
      if(this.flag != false){
        this.personas.splice(this.indice,1,values);
      }
      this.indice = null;    
    }
    
  }

  personaSeleccionada(persona){
    this.peopleForm.setValue(persona);
    this.indice = this.personas.indexOf(persona);
  }

  resetForm(){
    this.peopleForm.reset(this.personaVacia);
  }
  
  validadorDni(control: AbstractControl){
    const documento = control.value;
    if (documento === null || !documento.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
     return null;
  }

}