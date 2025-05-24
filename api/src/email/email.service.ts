import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter!: nodemailer.Transporter;

  constructor() {
    this.createTransporter();
  }

  private createTransporter() {
    // Configuration SMTP - Utilisez Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'zakariachtebat@gmail.com',
        pass: process.env.EMAIL_PASS || 'votre_mot_de_passe_app'
      }
    });
  }

  async sendContactEmail(contactData: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    entreprise?: string;
    sujet: string;
    message: string;
  }) {
    try {
      const mailOptions = {
        from: contactData.email,
        to: 'zakariachtebat@gmail.com',
        subject: `Contact CCIS Nador - ${contactData.sujet}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #4CAF50, #2196F3); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="margin: 0;">📧 Nouveau message de contact - CCIS Nador</h2>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-top: 0;">Informations du contact</h3>
              <p style="margin: 5px 0;"><strong>Nom :</strong> ${contactData.nom} ${contactData.prenom}</p>
              <p style="margin: 5px 0;"><strong>Email :</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
              ${contactData.telephone ? `<p style="margin: 5px 0;"><strong>Téléphone :</strong> ${contactData.telephone}</p>` : ''}
              ${contactData.entreprise ? `<p style="margin: 5px 0;"><strong>Entreprise :</strong> ${contactData.entreprise}</p>` : ''}
              <p style="margin: 5px 0;"><strong>Sujet :</strong> ${contactData.sujet}</p>
            </div>
            
            <div style="background: white; padding: 15px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; line-height: 1.6;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 10px; background: #e3f2fd; border-radius: 5px; text-align: center;">
              <p style="margin: 0; color: #1976d2; font-size: 12px;">
                Ce message a été envoyé depuis le formulaire de contact du site CCIS Nador
              </p>
            </div>
          </div>
        `,
        replyTo: contactData.email
      };

      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email envoyé avec succès à zakariachtebat@gmail.com - ID: ${result.messageId}`);
      return { success: true, messageId: result.messageId };
    } catch (error: any) {
      this.logger.error(`Erreur lors de l'envoi de l'email: ${error.message}`);
      throw error;
    }
  }
} 