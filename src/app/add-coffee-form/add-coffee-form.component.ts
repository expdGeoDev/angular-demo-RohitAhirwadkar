import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CoffeeHttpService } from '../coffee-http.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-coffee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-coffee-form.component.html',
  styleUrl: './add-coffee-form.component.css'
})
export class AddCoffeeFormComponent {

  getGrindLevel(value: number): string {
    switch (value) {
      case 1:
        return 'Coarse';
      case 2:
        return 'Medium';
      case 3:
        return 'Fine';
      default:
        return 'Unknown';
    }
  }
  coffeeForm!: FormGroup;

  getSingleOrigin(value: boolean): string {
    if (value){
      return "On";
    } else {
      return "Off";
    }
  }

  constructor(
    private fb: FormBuilder,
    private coffeeService: CoffeeHttpService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {


    this.coffeeForm = this.fb.group({
      brand: ['', Validators.required],
      groundOrBeans: ['Ground'],
      roast: [''],
      singleOrigin: [false],
      grindLevel: [1],
      flavorNotes: [''],
    });
  }

  get brand() {
    return this.coffeeForm.get('brand');
  }

  onSubmit(): void {

    const formData = this.coffeeForm.value;
    if (this.coffeeForm.valid) {
      const formData = this.coffeeForm.value;
      console.log('Submitting the following: ', formData)
      this.coffeeService.submitCoffee(formData).subscribe(
        response => {
          console.log('Entry Submitted successfully', response);
          this.clearForm();
          this.toaster.success("Submitted Successfully", "Success");
        },
        error => {
          console.error('Submission Failed..', error);
          this.toaster.error("Submission Failed ", "Error");
        }

      )
    } else {
      console.error("Invalid Form", formData);
      this.toaster.warning("Please Fill Required Fields", "Warning");
    }

  }

  clearForm(): void {
    this.toaster.info("Form has been reset", "Info");
    this.coffeeForm.reset({
      brand: '',
      groundOrBeans: 'Ground',
      roast: '',
      singleOrigin: false,
      grindLevel: 1,
      flavorNotes: '',
    });

  }

}
