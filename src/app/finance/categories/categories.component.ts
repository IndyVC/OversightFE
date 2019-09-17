import { Component, OnInit } from "@angular/core";
import { MockService } from "src/app/mock.service";
import { Category } from "src/app/domain/category";
import { User } from "src/app/domain/user";
import { HostListener } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CategoryService } from "src/app/services/category/category.service";
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  currentCategory: Category;
  categories: Category[];
  fixedCategoriesIcons: string[] = [
    "fas fa-cat",
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
    "fas fa-gem",
    "fas fa-money-bill-wave",
    "fas fa-chart-line",
    "fas fa-coins",
    "fas fa-credit-card"
  ];
  user: User;
  form: FormGroup;
  public color: string;
  public selectedIcon: string = this.fixedCategoriesIcons[0];
  showCreate: boolean = false;
  public chartActive = 0;
  public error = "";
  public chart = "line";
  public legend = true;
  public labels;
  public data;
  public options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: { suggestedMin: 0 }
        }
      ]
    }
  };
  public chartColors: Array<any> = [
    {
      // first color
      backgroundColor: "rgba(26,35,126,0.5)",
      borderColor: "rgba(26,35,126,1)",
      pointBackgroundColor: "rgba(26,35,126,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(26,35,126,0.2)"
    },
    {
      // second color
      backgroundColor: "rgba(242,125,10,0.6)",
      borderColor: "rgba(242,125,10,1)",
      pointBackgroundColor: "rgba(242,125,10,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(242,125,10,0.2)"
    }
  ];
  public screenHeight: any;
  public screenWidth: any;
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  constructor(
    private _mock: MockService,
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _userService:UserService
  ) {
    this.onResize();
    console.log(this._userService.getUser());
  }

  ngOnInit() {
    this.categories = this._mock.getIndy().categories;
    this.currentCategory = this.categories[0];
    this.user = this._mock.getIndy();
    this.fillGraph(new Date());
    this.form = this._fb.group({
      name: ["", [Validators.required]],
      type: ["", [Validators.required]],
      icon: ["", [Validators.required]],
      color: ["", [Validators.required]]
    });
  }

  getCategories(): Category[] {
    return this.categories;
  }

  calculateTotalSpendOnCategory(): number {
    return this.user.calculateTotalSpendOnCategory(this.currentCategory);
  }
  setCategory(category) {
    this.currentCategory = category;
    this.fillGraph(new Date());
  }

  fillGraph(date: Date) {
    let newDate: Date = new Date();
    if (date.getFullYear() !== 1970) {
      newDate = date;
    }
    const transactions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.labels = [
      "Januari",
      "Februari",
      "Maart",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Augustus",
      "September",
      "Oktober",
      "November",
      "December"
    ];
    this.user.getIncomesFromYear(newDate).forEach(trans => {
      if (
        trans.category.name === this.currentCategory.name &&
        trans.category.type === this.currentCategory.type
      ) {
        const nrMonth = trans.date.getMonth();
        transactions[nrMonth] += trans.amount;
      }
    });

    this.user.getOutcomesFromYear(newDate).forEach(trans => {
      if (
        trans.category.name === this.currentCategory.name &&
        trans.category.type === this.currentCategory.type
      ) {
        const nrMonth = trans.date.getMonth();
        transactions[nrMonth] += trans.amount;
      }
    });
    transactions.length === 0
      ? (this.error = "Er zijn geen transacties voor deze opties")
      : (this.error = "");
    this.data = [
      {
        data: transactions,
        label: "Transacties"
      }
    ];
  }
  getUser() {
    return this.user;
  }
  updateTotalYear(event) {
    console.log(new Date("01-01-" + event.value));
    this.fillGraph(new Date(event.value));
  }
  smallScreen() {
    return this.screenWidth < 1200;
  }
  swipeLeft() {
    this.chartActive = (this.chartActive + 1) % 2;
  }
  swipeRight() {
    this.chartActive =
      this.chartActive - 1 < 0
        ? (this.chartActive = 1)
        : (this.chartActive -= 1);
  }

  noError() {
    return this.error == null || this.error === "";
  }

  toggleCreate() {
    if (this.showCreate) {
      this.showCreate = false;
    } else {
      this.showCreate = true;
    }
  }
  onSubmit() {
    const name = this.form.get("name").value;
    const icon = this.selectedIcon;
    const color = this.form.get("color").value;
    const type = this.form.get("type").value;
    const category = new Category(name, icon, color, type);
    this._categoryService.createCategory(category);
    this.toggleCreate();
  }
  changeColor(event) {
    this.color = event;
    this.form.get("color").setValue(event);
  }
  changeIcon(icon) {
    this.selectedIcon = icon;
  }
  getErrorMessage(field: string) {
    if (field === "name") {
      if (this.form.get("name").hasError("required")) {
        return "Naam is verplicht.";
      }
    } else if (field === "type") {
      if (this.form.get("type").hasError("required")) {
        return "Type is verplicht.";
      }
    } else if (field === "color") {
      if (this.form.get("color").hasError("required")) {
        return "Kleur is verplicht.";
      }
    }
  }
}
