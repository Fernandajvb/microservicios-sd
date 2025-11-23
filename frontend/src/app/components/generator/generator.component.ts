import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generator',
  imports: [FormsModule, RouterLink],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {
  selectedImage: string | null = null;
  topText: string = '';
  bottomText: string = '';

  templates = [
    {
      id: 1,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcHESPEpGcviEbjlhorNyonwI_qNTST5o2uo_onGuEvsruM3wLyzCbtFo4fgEvrt2tDrJng5xiZ3hdwiilylQUJsKeipMeLrFt9-ila3VXXuF8mYWHid093UVd8CbGcpdEabyytDBkh93evtXQLIOnyEoy5_zZ7KyOw90MnCFVy1gEZGQq98aVR-ymrf5UCGwcg0xXCkBxrl-p0EP-bGyM2-qcW8oln4Gsu-sLZsAIEy3VrKFBScEapOUfTs5S70vqN9LAVOxD0TM',
      alt: 'Meme template 1'
    },
    {
      id: 2,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjPyzG7xZ6kbj3xxemiwLImEpUr5621nRludAOXZ6WZwrKk06XowfIzhUuesTh7TqNAg4JJsK7WOMZZ37DuSlaKoVoyoWJZCwWYwTIdg-QnrbNyLWjdsJ4sJhOa4cvnngstQA_bwDR3LEk6kSXwN3npLplcSgo6h6Q300wflwA21wj4m4oEMwhgk4V2MNVQ_YkkMmhTCXEHPskkgATpbq3xJN_J4HlbXhnYw4GP74kv_c8TC1n7_rit_olzpxz81AkG2uJwNjIPnU',
      alt: 'Meme template 2'
    },
    {
      id: 3,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtDHDj8l_LmsOxvFm1z0HNb4nXU7Ve-5HYNUlE45lpdg--EScT9Z7tQyfsgSdocMf6gKAb1IAepvnWhT2GE_1X-m8HlgqYy5-16lJYgpPKezZHp0a1n8pTAB08PFrSIHU2mReQb7sLI3Fd_fHItDTZdAXeeyaUj3TlULgZEN9lgoGuCO7Ltox2gS0fM--ty3g9QfXYqG0g25K6-AnOZvmULjSFmXOE59pZ7MyxGbVCAMv1Un-fnaL9Zbw64qDsrnRrsTUrhDiBSxE',
      alt: 'Meme template 3'
    },
    {
      id: 4,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjRfuE_ZoU62dt98GH_mzh6Ul8LK4ueqwynWgBQOwW1hDfzasscF63fYp2rvCiIBtFjWTZLCZum9WmzDqNun8Rk1ZoUG9-I8eNiJjKcMwqgqkVtz9cYJaLwgTa24c_inq-2DHer9uL-um-l-U4hvHMyjxdye7VIR3LqygxqJGiIFDrT1drFqQln77Ukh2jHviK3YiGnLKSfQpiya5kRhafA2oPJZHcjG_gtpOMkGqyUnZQRkfvhunnG5ucK4wi2Khfuy27yoEuedQ',
      alt: 'Meme template 4'
    },
    {
      id: 5,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Vhqk1kiB3GGyUfqcEm2gaIIl_aZNm8ygouNV_7mBSUyrxE3C3zh4uBXC__2RpazBySjshTGeSXL79qYto0LOPQDUtt0uKST0HtVLcppXf6-u2yg6N_OMoFPHZH0UGQu-gB7WXTjUGgNQoHOqc8oNhF_TkTSpn7FjO7vQzZhqiYPiZrERRpMzxxxHLuA_TQKbVBLVWfPtOz9v0Hm7ygJgXm97M1U51JbVKF49PsKOd8u0r0LDt9f9okfFwJNWbkDlKppBp-K14Bk',
      alt: 'Meme template 5'
    }
  ];

  selectTemplate(template: any): void {
    this.selectedImage = template.url;
  }

  saveAndDownload(): void {
    // Aquí irá la lógica para guardar y descargar
    console.log('Guardar y descargar:', {
      image: this.selectedImage,
      topText: this.topText,
      bottomText: this.bottomText
    });
  }

  downloadOnly(): void {
    // Aquí irá la lógica para solo descargar
    console.log('Solo descargar:', {
      image: this.selectedImage,
      topText: this.topText,
      bottomText: this.bottomText
    });
  }

  cancel(): void {
    this.selectedImage = null;
    this.topText = '';
    this.bottomText = '';
  }
}
