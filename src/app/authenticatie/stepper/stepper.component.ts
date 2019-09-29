import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BankAccount } from "src/app/domain/account";
import { BankaccountService } from "src/app/services/bankaccount/bankaccount.service";
import { CategoryService } from "src/app/services/category/category.service";
import { Category } from "src/app/domain/category";
import { Router } from "@angular/router";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.css"]
})
export class StepperComponent implements OnInit {
  bankaccount: FormGroup;
  category: FormGroup;
  fixedCategoriesIcons: string[] = [
    "fas fa-money-bill-wave",
    "fas fa-chart-line",
    "fas fa-coins",
    "fas fa-credit-card",
    "fas fa-shopping-cart",
    "fas fa-car",
    "fas fa-ambulance",
    "fas fa-mobile-alt",
    "fas fa-at",
    "fas fa-baby",
    "fas fa-beer",
    "fas fa-bicycle",
    "fas fa-gift",
    "fas fa-book",
    "fas fa-bowling-ball",
    "fas fa-broom",
    "fas fa-bus",
    "fas fa-burn",
    "fas fa-cat",
    "fas fa-cookie-bite",
    "fas fa-campground",
    "fas fa-carrot",
    "fas fa-chair",
    "fas fa-cheese",
    "fas fa-cocktail",
    "fab fa-cc-visa",
    "fas fa-couch",
    "fas fa-recycle",
    "fas fa-dumbbell",
    "fab fa-ebay",
    "fas fa-envelope-open-text",
    "fas fa-fire-extinguisher",
    "fas fa-gas-pump",
    "fas fa-gamepad",
    "fas fa-gavel",
    "fas fa-futbol",
    "fas fa-glasses",
    "fas fa-graduation-cap",
    "fas fa-guitar",
    "fas fa-hammer",
    "fas fa-home",
    "fas fa-hospital",
    "fas fa-newspaper",
    "fas fa-parking",
    "fas fa-phone",
    "fas fa-plane-departure",
    "fas fa-pizza-slice",
    "fas fa-prescription-bottle-alt",
    "fas fa-shower",
    "fas fa-skiing",
    "fas fa-smoking",
    "fas fa-solar-panel",
    "fas fa-taxi",
    "fas fa-ticket-alt",
    "fas fa-train",
    "fas fa-tshirt",
    "fas fa-tv",
    "fas fa-utensils",
    "fas fa-briefcase",
    "fab fa-bitcoin",
    "fas fa-blind",
    "fas fa-gem"
  ];
  public selectedIconCreate: string = "";
  public color: string;

  constructor(
    private fb: FormBuilder,
    private bankaccountService: BankaccountService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bankaccount = this.fb.group({
      accountNumber: ["", [Validators.required]],
      balance: ["", [Validators.required]],
      bank: ["", [Validators.required]],
      type: ["", [Validators.required]]
    });
    this.category = this.fb.group({
      name: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      color: ["", [Validators.required]]
    });
  }

  changeColor(event) {
    this.color = event;
    this.category.get("color").setValue(event);
  }
  changeIcon(icon) {
    this.selectedIconCreate = icon;
  }
  submitBankaccount() {
    const accountNumber = this.bankaccount.get("accountNumber").value;
    let balance = this.bankaccount.get("balance").value.toString();
    const bank = this.bankaccount.get("bank").value;
    const type = this.bankaccount.get("type").value;
    balance = balance.replace(",", ".");
    const bankaccount = new BankAccount(
      accountNumber,
      parseFloat(balance),
      bank,
      type
    );
    this.bankaccountService.createBankaccount(bankaccount);
  }

  submitCategory() {
    const name = this.category.get("name").value;
    const icon = this.selectedIconCreate;
    const color = this.category.get("color").value;
    const category = new Category(name, icon, color);
    this.categoryService.createCategory(category);
    this.router.navigate(['../transacties']);
  }

  getErrorBankaccount(field: string) {
    if (field === "accountNumber") {
      if (this.bankaccount.get("accountNumber").hasError("required")) {
        return "Rekening nummer is verplicht.";
      }
    } else if (field === "type") {
      if (this.bankaccount.get("type").hasError("required")) {
        return "Type is verplicht.";
      }
    } else if (field === "balance") {
      if (this.bankaccount.get("balance").hasError("required")) {
        return "Balans is verplicht.";
      }
    } else if (field === "bank") {
      if (this.bankaccount.get("bank").hasError("required")) {
        return "Bank is verplicht.";
      }
    }
  }

  getErrorCategory(field: string) {
    if (field === "name") {
      if (this.category.get("name").hasError("required")) {
        return "Naam is verplicht.";
      }
    } else if (field === "color") {
      if (this.category.get("color").hasError("required")) {
        return "Kleur is verplicht.";
      }
    }
  }
}
