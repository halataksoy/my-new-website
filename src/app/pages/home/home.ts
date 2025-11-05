import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Footer, CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // formu constructor içinde kurduk, böylece fb hazırken kullanıyoruz
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9+\s()-]{7,}$/),
        ],
      ],
      email: ['', [Validators.email]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Form gönderildi:', this.contactForm.value);
    alert('Form alındı');
    this.contactForm.reset();
  }

  processSteps = [
    {
      badge: '1',
      title: 'İlk Danışmanlık',
      content:
        'İlk değerlendirmede saç fotoğraflarınız incelenir, kısa bir ön görüşme yapılır ve beklentiniz netleştirilir.',
    },
    {
      badge: '2',
      title: 'Saç Analizi',
      content:
        'Doktor saç yapınızı, ihtiyacınız olan greft sayısını ve sizin için en uygun tekniği belirler.',
    },
    {
      badge: '3',
      title: 'Özel Transfer Hizmeti',
      content:
        'Havaalanı, otel ve klinik arasında sorunsuz ulaşım için VIP transfer süreci planlanır.',
    },
    {
      badge: '4',
      title: 'Saç Ekimi Ameliyatı',
      content:
        'Gün içinde ağrısız-sedasyon destekli saç ekimi yapılır, operasyon sonrası bakımınız anlatılır.',
    },
    {
      badge: '5',
      title: 'İşlem Sonrası Bakım',
      content:
        'Ertesi gün kontrol ve pansuman yapılır; şampuan, sprey ve kullanmanız gereken ürünler verilir.',
    },
    {
      badge: '6',
      title: 'Misafir Takibi',
      content:
        'Sonuçların kalıcı olması için belirli aralıklarla klinik ekibi sizi takip eder.',
    },
  ];

  // hangisi açık
  activeStep = 0;

  toggleStep(i: number) {
    // aynısına tıklarsa kapat
    this.activeStep = this.activeStep === i ? -1 : i;
  }
}
