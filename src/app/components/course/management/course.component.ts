import {Component, OnInit} from '@angular/core';
import {Course} from '../../../models/course';
import {CourseService} from '../../../service/course.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  successCode = '00';

  courses: Course[];
  tmpRegisterForDelete: string;
  tmpRegisterForUpdate: string;

  constructor(private courseService: CourseService,
              private router: Router) {
    this.courses = [];
    this.tmpRegisterForUpdate = undefined;
    this.tmpRegisterForDelete = undefined;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    Swal.fire('Consultando Cursos...', 'Espere un momento por favor.', 'info');
    Swal.showLoading();

    this.courseService.getAll().subscribe(resp => {
      Swal.close();
      this.courses = resp.data as unknown as Course[];
    });
  }

  saveRegister(course: Course, update: boolean) {
    if (update) {
      this.courseService.userForUpdate = course;
      this.router.navigate(['/update']);
    } else {
      Swal.fire({
        title: 'Confirmación',
        text: '¿Desea eliminar?',
        type: 'question',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showConfirmButton: true,
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          Swal.fire('Eliminando...', 'Espere un momento por favor.', 'info');
          Swal.showLoading();
          this.courseService.deleteByName(course.courseName).subscribe(resp => {
            this.getData();
            const success = (resp.meta.code === this.successCode);
            Swal.close();
            Swal.fire((success) ? 'Exitoso' : 'Error', resp.data as string, (success) ? 'success' : 'error');
          });
        }
      });
    }
  }

  newRegister() {
    this.router.navigate(['/create']);
  }
}
