import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SalaryCalculationService} from "./salary-calculation-service";
import {SalaryCalculationResult} from "./salary-calculation-result";
import {FormsModule} from "@angular/forms";
import {Employee} from "./employee";
import {InstructorSalaryCalculationService} from "./instructor-salary-calculation-service";
import {LifeguardSalaryCalculationService} from "./lifeguard-salary-calculation-service";
import {AdministratorSalaryCalculationService} from "./administrator-salary-calculation-service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kr1';
  employee: Employee = {
    name: '',
    age: 0,
    level: '',
    experience: 0,
    type : ''
  };
  sal : number = 0;
  private salaryCalculationService: SalaryCalculationService | undefined;


  submitForm() {
    if(this.employee.type == 'instructor'){
      this.salaryCalculationService = new InstructorSalaryCalculationService();
  }else if(this.employee.type =="lifeguard"){
      this.salaryCalculationService = new LifeguardSalaryCalculationService();
    }else if(this.employee.type == "administrator"){
      this.salaryCalculationService = new AdministratorSalaryCalculationService();
    }
    if(this.salaryCalculationService != undefined && !((this.employee.age < 18 || this.employee.age >  40 )&& this.employee.type == 'lifeguard')) {
      console.log(this.calculateSalaries(this.employee));
    }// Виведення введених даних в консоль
    else {
      alert("Wrong input");
    }
  }

  calculateSalaries(employee: Employee): SalaryCalculationResult[] {
    // @ts-ignore
    this.sal  = this.salaryCalculationService.calculateSalary(employee);
    return [{ employeeName: employee.name, salary: this.sal }];
  }
}


