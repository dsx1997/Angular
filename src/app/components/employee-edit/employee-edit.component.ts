import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  submitted = false;
  // editForm: FormGroup;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  editForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    designation: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  })
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    // this.getEmployee(id);
    
  }
// Choose options with select-dropdown
// updateProfile(e) {
//   this.editForm.get('designation').setValue(e, {
//     onlySelf: true
//   })
// }

// Getter to access form control
get myForm() {
  return this.editForm.controls;
}

// getEmployee(id: any) {
//   this.apiService.getEmployee(id).subscribe(data => {
//     this.editForm.setValue({
//       name: data['name'],
//       email: data['email'],
//       designation: data['designation'],
//       phoneNumber: data['phoneNumber'],
//     });
//   });
// }

updateEmployee() {
  this.editForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    designation: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  })
}

onSubmit(): any {
  this.submitted = true;
  if (!this.editForm.valid) {
    return false;
  } else {
    if (window.confirm('Are you sure?')) {
      let id = Number(this.actRoute.snapshot.paramMap.get('id'));
      this.apiService.updateEmployee(id, this.editForm.value)
        .subscribe(res => {
          this.router.navigateByUrl('/employees-list');
          console.log('Content updated successfully!')
        }, (error) => {
          console.log(error)
        })
    }
  }
}



}
