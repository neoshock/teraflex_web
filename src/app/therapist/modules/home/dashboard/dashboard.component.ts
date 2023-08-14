import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponseGetMyInformationI, InformationTerapistDetailI } from 'src/app/therapist/interfaces/profile.interface';
import { ProfileService } from 'src/app/therapist/services/profile.service';
import { ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  //Variables
  spinnerStatus: boolean = true;
  optionMenu: number = 0;
  userRole: string = "role";
  detailInfoTerapist: InformationTerapistDetailI = {
    id: 0,
    firstName: "",
    lastName: "",
    docNumber: "",
    phone: "",
    description: "",
    birthDate: "",
    createdAt: "",
    updatedAt: "",
    role: "",
    categoryId: 0,
    categoryName: "",
    status: false,
  };

  /*Constructor*/
  constructor(
    private ruta: Router,
    private route: ActivatedRoute,
    private myProfileService: ProfileService,
    private toastr: ToastrService
  ) { }


  /*ngOnInit*/
  ngOnInit(): void {
    this.getMyInformation();
    this.showHideChildsOption();
    this.showHideMenuProfile();
    this.showHideSidebar();
    this.detectedScreen();
    this.optionSelectedOnMenu();
    this.ruta.navigate(['options-home'], { relativeTo: this.route })
  }

  /*Método que obtiene los headers*/
  getHeaders(){
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("role", sessionStorage.getItem("role"));
    return headers;
  }

  /*Método que cierra la sesión del usuario*/
  signOut() {
    this.spinnerStatus = false;
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    setTimeout(() => {
      this.spinnerStatus = true;
      this.ruta.navigateByUrl('therapist/auth/login');
    }, 2000);
  }

  /*Método que muestra y oculta los hijos de una opción del menú*/
  showHideChildsOption() {
    const allDropdown = document.querySelectorAll<HTMLDivElement>('#sidebar .side-dropdown');
    allDropdown.forEach((item: HTMLDivElement) => {
      const a = item.parentElement?.querySelector<HTMLAnchorElement>('a:first-child');
      a?.addEventListener('click', function (e: Event) {
        e.preventDefault();
        if (!item.classList.contains('active')) {
          allDropdown.forEach((i: HTMLDivElement) => {
            const aLink = i.parentElement?.querySelector<HTMLAnchorElement>('a:first-child');
            if (aLink)
              aLink.classList.remove('active');
            i.classList.remove('show');
          });
        }
        item.classList.toggle('active');
        item.classList.toggle('show');
      });
    });
  }

  /*Método que muestra y oculta el menú de la foto de perfil*/
  showHideMenuProfile() {
    const profile = document.querySelector<HTMLDivElement>('nav .profile');
    const imgProfile = profile?.querySelector<HTMLImageElement>('img');
    const dropdownProfile = profile?.querySelector<HTMLDivElement>('.profile-link');
    imgProfile?.addEventListener('click', function () {
      dropdownProfile?.classList.toggle('show');
    });
    window.addEventListener('click', function (e: MouseEvent) {
      if (e.target !== imgProfile) {
        if (e.target !== dropdownProfile) {
          if (dropdownProfile && dropdownProfile.classList.contains('show')) {
            dropdownProfile.classList.remove('show');
          }
        }
      }
    });
  }

  /*Método que muestra y oculta el manú lateral del dashboard*/
  showHideSidebar() {
    const toggleSidebar = document.querySelector('nav .toggle-sidebar') as HTMLElement;
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const allSidebar = document.querySelectorAll<HTMLDivElement>('#sidebar .divider');

    if (sidebar.classList.contains('hide')) {
      allSidebar.forEach((item: HTMLDivElement) => {
        item.textContent = '-';
      });
    }
    else {
      allSidebar.forEach((item: HTMLDivElement) => {
        item.textContent = '-';
      });
    }
    toggleSidebar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    });
  }

  /*Método que detecta el tamaño de la pantalla, para ocultar automáticamente el menú lateral*/
  detectedScreen() {
    window.addEventListener('resize', function () {
      const sidebar = document.getElementById('sidebar') as HTMLElement;
      const isMobile = window.innerWidth <= 767;
      if (isMobile) {
        sidebar?.classList.add('hide');
      } else {
        sidebar?.classList.remove('hide');
      }
    });
  }

  /*Método que agrega o elimina la clase "active" de una opción del menú*/
  optionSelectedOnMenu() {
    const menuItems = document.querySelectorAll('.side-menu li');
    menuItems.forEach((menuItem) => {
      const link = menuItem.querySelector('a') as HTMLElement;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        menuItems.forEach((item) => {
          item.querySelector('a')?.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  }

  /*Método que obtiene la información personal de un terapeuta, para mostrar en el perfil*/
  getMyInformation(){
    this.myProfileService.getMyInformation(this.getHeaders())
      .subscribe({
        next: (data: ApiResponseGetMyInformationI) => {
          this.detailInfoTerapist = data.data;
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo obtener su información");
        }
      })
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconBars = iconos.faBars;
  iconHome = iconos.faHome;
  iconTasks = iconos.faListCheck;
  iconMyTasks = iconos.faFileLines;
  iconAsignTasks = iconos.faCalendarDay;
  iconInformation = iconos.faInfoCircle;
  iconResources = iconos.faFilm;
  iconUploadVideos = iconos.faVideoCamera;
  iconPatients = iconos.faUsers;
  iconMyPatients = iconos.faPeopleRoof;
  iconViewProgress = iconos.faChartSimple;
  iconHelp = iconos.faQuestionCircle;
  iconArrowDown = iconos.faChevronDown;

  iconSearch = iconos.faSearch;
  iconBell = iconos.faBell;
  iconMessage = iconos.faMessage;

  iconProfile = iconos.faUserCircle;
  iconSettings = iconos.faGear;
  iconLogOut = iconos.faArrowRightFromBracket;
}
