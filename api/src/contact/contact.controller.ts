import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendContactMessage(@Body() contactData: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    entreprise?: string;
    sujet: string;
    message: string;
  }) {
    // Validation des champs obligatoires
    if (!contactData.nom || !contactData.prenom || !contactData.email || !contactData.sujet || !contactData.message) {
      throw new BadRequestException('Tous les champs obligatoires doivent être remplis');
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      throw new BadRequestException('Format d\'email invalide');
    }

    // Validation de la longueur du message
    if (contactData.message.trim().length < 10) {
      throw new BadRequestException('Le message doit contenir au moins 10 caractères');
    }

    try {
      const result = await this.emailService.sendContactEmail(contactData);
      return {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        messageId: result.messageId
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.');
    }
  }
} 