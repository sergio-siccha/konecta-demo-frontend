import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseRegisterRequest} from '../../../../models/course';
import Swal from 'sweetalert2';
import {CourseService} from '../../../../service/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  // @ts-ignore
  @ViewChild('inputFile', {static: false}) inputFile: ElementRef;

  formCreation: CourseRegisterRequest;
  srcResult: string;

  constructor(private courseService: CourseService,
              private router: Router) {
    this.formCreation = new CourseRegisterRequest();
  }

  ngOnInit() {
  }

  select() {
    const inputFile = this.inputFile.nativeElement as HTMLInputElement;

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        this.formCreation.courseImage = this.srcResult.split(',')[1];
      };

      reader.readAsDataURL(inputFile.files[0]);
    }
  }

  // tslint:disable-next-line:ban-types
  fieldIsNullOrUndefined(value: Object): boolean {
    return (value === undefined) || (value === null);
  }

  async save() {
    Swal.fire('Registrando...', 'Espere un momento por favor.', 'info');
    Swal.showLoading();
    if (!this.fieldIsNullOrUndefined(this.formCreation.courseName) || !this.fieldIsNullOrUndefined(this.formCreation.courseResume)) {
      await this.courseService.save(this.formCreation).toPromise().then(value => {
        Swal.close();
        Swal.fire('¡Genial!', 'Se ha creado con éxito', 'success');
        this.router.navigate(['course']);
      }).catch(err => {
        console.error('Error: ', err);
        Swal.close();
        Swal.fire({
          title: '¡Oh no!',
          text: 'Ha ocurrido un error al registrar: ' + err.getMessage,
          type: 'error',
          timer: 3000
        });
      });
    } else {
      Swal.close();
      Swal.fire({
        title: 'Validación',
        text: 'Debe llenar los campos nombre y resumen para guardar.' ,
        type: 'error',
        timer: 3000
      });
    }
  }

}
