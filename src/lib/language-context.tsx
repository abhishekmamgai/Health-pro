'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type LangKey = 'English' | 'Hindi' | 'Spanish' | 'French' | 'German' | 'Portuguese';
export const LANGUAGE_OPTIONS: LangKey[] = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Portuguese'];

// ─── Translation Map ─────────────────────────────────────────────────────────
// Covers all dashboard sidebar labels + section headings + common buttons
export type SiteTranslations = {
    // Nav
    navHome: string; navFitness: string; navExercises: string;
    navProgress: string; navStore: string; navMembership: string; navSettings: string;
    // Common
    saveChanges: string; saving: string; cancel: string; close: string; learnMore: string;
    addToBag: string; added: string; checkout: string; joinNow: string; upgrade: string;
    // Dashboard
    dashWelcome: string; dashStreak: string; dashDays: string; dashCheckIn: string;
    dashCheckedIn: string; dashAI: string; dashBurn: string; dashActive: string;
    // Exercises
    exTitle: string; exSubtitle: string; exSearch: string; exAll: string;
    // Progress
    progTitle: string; progSubtitle: string; progStreak: string; progWorkouts: string; progCalories: string;
    // Store
    storeTitle: string; storeSubtitle: string; storeSearch: string; storeAll: string;
    storeNutrition: string; storeApparel: string; storeEquipment: string; storeAccessories: string; storeSupplements: string;
    storeBannerTitle: string; storeBannerCode: string; storeShopNow: string;
    storeRewards: string; storeRewardsDesc: string; storeJoinRewards: string;
    // Membership
    memberTitle: string; memberSubtitle: string; memberActivePlan: string; memberFreeMsg: string;
    memberBilling: string; memberPayment: string; memberUpgrade: string; memberCancel: string;
    memberBenefits: string; memberBenefit1: string; memberBenefit2: string; memberBenefit3: string;
    memberBenefit4: string; memberBenefit5: string;
    memberEliteTitle: string; memberEliteDesc: string; memberViewPlans: string;
    // Settings
    settingsTitle: string; settingsSubtitle: string;
    tabProfile: string; tabNotifications: string; tabPrivacy: string; tabLanguage: string;
    profileSection: string; changePhoto: string; photoHint: string;
    fullName: string; email: string; emailHint: string; goal: string; fitnessLevel: string;
    reset: string;
    notifSection: string; emailNotif: string; emailNotifDesc: string;
    workoutReminder: string; workoutReminderDesc: string;
    weeklyReport: string; weeklyReportDesc: string;
    progressAlert: string; progressAlertDesc: string; notifNote: string;
    changePassword: string; currentPassword: string; newPassword: string; confirmPassword: string;
    updatePassword: string; dangerZone: string; deleteAccount: string; deleteDesc: string;
    languageTheme: string; darkMode: string; darkModeDesc: string;
    light: string; dark: string; displayLanguage: string;
    savedSuccess: string; resetSuccess: string; photoUpdated: string;
    pwChanged: string; pwError: string; pwMismatch: string; pwTooShort: string; nameEmpty: string;
};

const EN: SiteTranslations = {
    navHome: 'Home', navFitness: 'Fitness & Booking', navExercises: 'Exercises',
    navProgress: 'Progress', navStore: 'Wellness Store', navMembership: 'Pass Membership', navSettings: 'Settings',
    saveChanges: 'Save Changes', saving: 'Saving…', cancel: 'Cancel', close: 'Close', learnMore: 'Learn More',
    addToBag: 'Add to Bag', added: 'Added', checkout: 'Checkout', joinNow: 'Join Now', upgrade: 'Upgrade',
    dashWelcome: 'Glad to see you,', dashStreak: 'Days Streak', dashDays: 'Days', dashCheckIn: 'Check-in Now',
    dashCheckedIn: 'Checked in today', dashAI: 'AI-Personalized Regime', dashBurn: 'Burn', dashActive: 'Active',
    exTitle: 'Exercise', exSubtitle: 'Your complete library of guided workouts and movement tutorials.', exSearch: 'Search exercises…', exAll: 'All',
    progTitle: 'My', progSubtitle: 'Track your fitness journey and celebrate your milestones.',
    progStreak: 'Day Streak', progWorkouts: 'Workouts', progCalories: 'kcal Burned',
    storeTitle: 'Wellness', storeSubtitle: 'Curated high-performance gear & nutrition for the health.pro community.',
    storeSearch: 'Search products…', storeAll: 'All Items', storeNutrition: 'Nutrition',
    storeApparel: 'Apparel', storeEquipment: 'Equipment', storeAccessories: 'Accessories', storeSupplements: 'Supplements',
    storeBannerTitle: '30% OFF ALL NUTRITION', storeBannerCode: 'Use code HPPRO2026 at checkout.',
    storeShopNow: 'Shop Sale Now', storeRewards: 'Get HP Rewards',
    storeRewardsDesc: 'Earn 5% HP Coins on every purchase to redeem for gym passes.',
    storeJoinRewards: 'Join Rewards',
    memberTitle: 'Pass', memberSubtitle: 'Manage your subscription and billing details.',
    memberActivePlan: 'ACTIVE PLAN', memberFreeMsg: 'You are on the basic free tier. Upgrade for AI routines and gym access.',
    memberBilling: 'Next billing date:', memberPayment: 'Payment method:',
    memberUpgrade: 'Update Payment', memberCancel: 'Cancel Subscription',
    memberBenefits: 'Your Member Benefits', memberBenefit1: 'Unlimited Gym Partner Access',
    memberBenefit2: 'AI Workout Generator (Unlimited)', memberBenefit3: '15% Store Discount',
    memberBenefit4: 'Advanced Progress Analytics', memberBenefit5: 'Priority Class Booking',
    memberEliteTitle: 'Upgrade to Elite',
    memberEliteDesc: 'Get personal coaching and customized nutrition plans starting at ₹2,999/mo.',
    memberViewPlans: 'View Elite Plans',
    settingsTitle: 'Account', settingsSubtitle: 'Configure your profile and application preferences.',
    tabProfile: 'Profile', tabNotifications: 'Notifications', tabPrivacy: 'Privacy & Security', tabLanguage: 'Language & Theme',
    profileSection: 'Profile Information', changePhoto: 'Change Photo', photoHint: 'JPG, GIF or PNG. Max size of 800K',
    fullName: 'Full Name', email: 'Email Address', emailHint: 'Email cannot be changed',
    goal: 'Preferred Goal', fitnessLevel: 'Fitness Level', reset: 'Reset',
    notifSection: 'Notification Preferences',
    emailNotif: 'Email Notifications', emailNotifDesc: 'Receive weekly progress reports and nutrition tips.',
    workoutReminder: 'Workout Reminders', workoutReminderDesc: 'Daily reminders to complete your planned workout.',
    weeklyReport: 'Weekly Reports', weeklyReportDesc: 'Get a summary of your weekly fitness performance.',
    progressAlert: 'Progress Alerts', progressAlertDesc: 'Get notified when you hit a new personal record.',
    notifNote: 'Notification preferences are saved automatically.',
    changePassword: 'Change Password', currentPassword: 'Current Password', newPassword: 'New Password', confirmPassword: 'Confirm New Password',
    updatePassword: 'Update Password', dangerZone: 'Danger Zone', deleteAccount: 'Delete Account',
    deleteDesc: 'Permanently delete your account and all associated data. This cannot be undone.',
    languageTheme: 'Language & Theme', darkMode: 'Dark Mode', darkModeDesc: 'Switch between light and dark interface themes.',
    light: 'Light', dark: 'Dark', displayLanguage: 'Display Language',
    savedSuccess: 'Profile saved successfully!', resetSuccess: 'Form reset to saved values', photoUpdated: 'Profile photo updated!',
    pwChanged: 'Password changed successfully!', pwError: 'Current password is incorrect',
    pwMismatch: 'New passwords do not match', pwTooShort: 'New password must be at least 6 characters', nameEmpty: 'Full name cannot be empty',
};

const HI: SiteTranslations = {
    navHome: 'होम', navFitness: 'फिटनेस और बुकिंग', navExercises: 'व्यायाम',
    navProgress: 'प्रगति', navStore: 'वेलनेस स्टोर', navMembership: 'पास मेंबरशिप', navSettings: 'सेटिंग्स',
    saveChanges: 'परिवर्तन सहेजें', saving: 'सहेजा जा रहा है…', cancel: 'रद्द करें', close: 'बंद करें', learnMore: 'अधिक जानें',
    addToBag: 'बैग में जोड़ें', added: 'जोड़ा गया', checkout: 'चेकआउट', joinNow: 'अभी जुड़ें', upgrade: 'अपग्रेड',
    dashWelcome: 'देखकर खुशी हुई,', dashStreak: 'दिन स्ट्रीक', dashDays: 'दिन', dashCheckIn: 'अभी चेक-इन करें',
    dashCheckedIn: 'आज चेक-इन हो गया', dashAI: 'AI-व्यक्तिगत योजना', dashBurn: 'बर्न', dashActive: 'सक्रिय',
    exTitle: 'व्यायाम', exSubtitle: 'निर्देशित वर्कआउट का पूरा पुस्तकालय।', exSearch: 'व्यायाम खोजें…', exAll: 'सभी',
    progTitle: 'मेरी', progSubtitle: 'अपनी फिटनेस यात्रा को ट्रैक करें।',
    progStreak: 'दिन स्ट्रीक', progWorkouts: 'वर्कआउट', progCalories: 'kcal जला',
    storeTitle: 'वेलनेस', storeSubtitle: 'health.pro समुदाय के लिए उच्च प्रदर्शन गियर और पोषण।',
    storeSearch: 'उत्पाद खोजें…', storeAll: 'सभी', storeNutrition: 'पोषण',
    storeApparel: 'कपड़े', storeEquipment: 'उपकरण', storeAccessories: 'सहायक उपकरण', storeSupplements: 'सप्लीमेंट',
    storeBannerTitle: 'सभी पोषण पर 30% छूट', storeBannerCode: 'चेकआउट पर HPPRO2026 कोड उपयोग करें।',
    storeShopNow: 'अभी खरीदें', storeRewards: 'HP रिवार्ड पाएं',
    storeRewardsDesc: 'हर खरीद पर 5% HP कॉइन कमाएं।', storeJoinRewards: 'रिवार्ड जॉइन करें',
    memberTitle: 'पास', memberSubtitle: 'अपनी सदस्यता और बिलिंग विवरण प्रबंधित करें।',
    memberActivePlan: 'सक्रिय योजना', memberFreeMsg: 'आप बेसिक फ्री टियर पर हैं। प्रीमियम के लिए अपग्रेड करें।',
    memberBilling: 'अगली बिलिंग तारीख:', memberPayment: 'भुगतान विधि:',
    memberUpgrade: 'भुगतान अपडेट करें', memberCancel: 'सदस्यता रद्द करें',
    memberBenefits: 'आपके सदस्य लाभ', memberBenefit1: 'असीमित जिम पार्टनर एक्सेस',
    memberBenefit2: 'AI वर्कआउट जनरेटर', memberBenefit3: '15% स्टोर छूट',
    memberBenefit4: 'उन्नत प्रगति विश्लेषण', memberBenefit5: 'प्राथमिकता क्लास बुकिंग',
    memberEliteTitle: 'एलीट में अपग्रेड करें',
    memberEliteDesc: 'व्यक्तिगत कोचिंग और पोषण योजना ₹2,999/माह से शुरू।',
    memberViewPlans: 'एलीट प्लान देखें',
    settingsTitle: 'खाता', settingsSubtitle: 'अपनी प्रोफ़ाइल और ऐप प्राथमिकताएं कॉन्फ़िगर करें।',
    tabProfile: 'प्रोफ़ाइल', tabNotifications: 'सूचनाएं', tabPrivacy: 'गोपनीयता', tabLanguage: 'भाषा और थीम',
    profileSection: 'प्रोफ़ाइल जानकारी', changePhoto: 'फ़ोटो बदलें', photoHint: 'JPG, GIF या PNG। अधिकतम 800K',
    fullName: 'पूरा नाम', email: 'ईमेल पता', emailHint: 'ईमेल बदला नहीं जा सकता',
    goal: 'पसंदीदा लक्ष्य', fitnessLevel: 'फिटनेस स्तर', reset: 'रीसेट',
    notifSection: 'सूचना प्राथमिकताएं',
    emailNotif: 'ईमेल सूचनाएं', emailNotifDesc: 'साप्ताहिक प्रगति रिपोर्ट प्राप्त करें।',
    workoutReminder: 'वर्कआउट रिमाइंडर', workoutReminderDesc: 'दैनिक वर्कआउट रिमाइंडर।',
    weeklyReport: 'साप्ताहिक रिपोर्ट', weeklyReportDesc: 'साप्ताहिक प्रदर्शन सारांश।',
    progressAlert: 'प्रगति अलर्ट', progressAlertDesc: 'नए रिकॉर्ड पर सूचित हों।',
    notifNote: 'सूचना प्राथमिकताएं स्वचालित सहेजी जाती हैं।',
    changePassword: 'पासवर्ड बदलें', currentPassword: 'वर्तमान पासवर्ड', newPassword: 'नया पासवर्ड', confirmPassword: 'पासवर्ड की पुष्टि',
    updatePassword: 'पासवर्ड अपडेट करें', dangerZone: 'खतरनाक क्षेत्र', deleteAccount: 'खाता हटाएं',
    deleteDesc: 'खाता और सभी डेटा स्थायी रूप से हटाएं।',
    languageTheme: 'भाषा और थीम', darkMode: 'डार्क मोड', darkModeDesc: 'लाइट और डार्क थीम के बीच स्विच करें।',
    light: 'लाइट', dark: 'डार्क', displayLanguage: 'प्रदर्शन भाषा',
    savedSuccess: 'सफलतापूर्वक सहेजी गई!', resetSuccess: 'फ़ॉर्म रीसेट किया गया', photoUpdated: 'फ़ोटो अपडेट की गई!',
    pwChanged: 'पासवर्ड बदला गया!', pwError: 'वर्तमान पासवर्ड गलत है',
    pwMismatch: 'पासवर्ड मेल नहीं खाते', pwTooShort: 'कम से कम 6 अक्षर चाहिए', nameEmpty: 'नाम खाली नहीं हो सकता',
};

const ES: SiteTranslations = {
    navHome: 'Inicio', navFitness: 'Fitness y Reservas', navExercises: 'Ejercicios',
    navProgress: 'Progreso', navStore: 'Tienda Wellness', navMembership: 'Membresía', navSettings: 'Ajustes',
    saveChanges: 'Guardar cambios', saving: 'Guardando…', cancel: 'Cancelar', close: 'Cerrar', learnMore: 'Saber más',
    addToBag: 'Añadir a la bolsa', added: 'Añadido', checkout: 'Pagar', joinNow: 'Únete ahora', upgrade: 'Mejorar',
    dashWelcome: 'Me alegra verte,', dashStreak: 'Días de racha', dashDays: 'Días', dashCheckIn: 'Registrarse ahora',
    dashCheckedIn: 'Registrado hoy', dashAI: 'Régimen AI personalizado', dashBurn: 'Quemado', dashActive: 'Activo',
    exTitle: 'Ejercicio', exSubtitle: 'Tu biblioteca completa de entrenamientos guiados.', exSearch: 'Buscar ejercicios…', exAll: 'Todo',
    progTitle: 'Mi', progSubtitle: 'Sigue tu viaje de fitness.',
    progStreak: 'días de racha', progWorkouts: 'Entrenamientos', progCalories: 'kcal quemadas',
    storeTitle: 'Wellness', storeSubtitle: 'Equipo e nutrición de alto rendimiento para la comunidad health.pro.',
    storeSearch: 'Buscar productos…', storeAll: 'Todo', storeNutrition: 'Nutrición',
    storeApparel: 'Ropa', storeEquipment: 'Equipo', storeAccessories: 'Accesorios', storeSupplements: 'Suplementos',
    storeBannerTitle: '30% DE DESCUENTO EN NUTRICIÓN', storeBannerCode: 'Usa el código HPPRO2026 al pagar.',
    storeShopNow: 'Comprar ahora', storeRewards: 'Obtén HP Rewards',
    storeRewardsDesc: 'Gana 5% en HP Coins con cada compra.', storeJoinRewards: 'Unirse a Rewards',
    memberTitle: 'Pass', memberSubtitle: 'Gestiona tu suscripción y detalles de facturación.',
    memberActivePlan: 'PLAN ACTIVO', memberFreeMsg: 'Estás en el nivel gratuito básico. Mejora para acceder a funciones premium.',
    memberBilling: 'Próxima fecha de facturación:', memberPayment: 'Método de pago:',
    memberUpgrade: 'Actualizar pago', memberCancel: 'Cancelar suscripción',
    memberBenefits: 'Tus beneficios de miembro', memberBenefit1: 'Acceso ilimitado a gimnasios asociados',
    memberBenefit2: 'Generador de ejercicio AI', memberBenefit3: '15% de descuento en tienda',
    memberBenefit4: 'Análisis avanzado de progreso', memberBenefit5: 'Reserva prioritaria de clases',
    memberEliteTitle: 'Mejora a Elite',
    memberEliteDesc: 'Coaching personal desde ₹2,999/mes.',
    memberViewPlans: 'Ver planes Elite',
    settingsTitle: 'Cuenta', settingsSubtitle: 'Configura tu perfil y preferencias.',
    tabProfile: 'Perfil', tabNotifications: 'Notificaciones', tabPrivacy: 'Privacidad', tabLanguage: 'Idioma y tema',
    profileSection: 'Información del perfil', changePhoto: 'Cambiar foto', photoHint: 'JPG, GIF o PNG. Máx 800K',
    fullName: 'Nombre completo', email: 'Correo electrónico', emailHint: 'El correo no se puede cambiar',
    goal: 'Meta preferida', fitnessLevel: 'Nivel de condición', reset: 'Restablecer',
    notifSection: 'Preferencias de notificación',
    emailNotif: 'Notificaciones por correo', emailNotifDesc: 'Recibe informes y consejos nutricionales.',
    workoutReminder: 'Recordatorios', workoutReminderDesc: 'Recordatorios diarios de entrenamiento.',
    weeklyReport: 'Informes semanales', weeklyReportDesc: 'Resumen semanal de rendimiento.',
    progressAlert: 'Alertas de progreso', progressAlertDesc: 'Notificaciones al lograr un nuevo récord.',
    notifNote: 'Se guardan automáticamente.',
    changePassword: 'Cambiar contraseña', currentPassword: 'Contraseña actual', newPassword: 'Nueva contraseña', confirmPassword: 'Confirmar contraseña',
    updatePassword: 'Actualizar contraseña', dangerZone: 'Zona de peligro', deleteAccount: 'Eliminar cuenta',
    deleteDesc: 'Elimina permanentemente tu cuenta. No se puede deshacer.',
    languageTheme: 'Idioma y tema', darkMode: 'Modo oscuro', darkModeDesc: 'Cambia entre temas claro y oscuro.',
    light: 'Claro', dark: 'Oscuro', displayLanguage: 'Idioma de visualización',
    savedSuccess: '¡Perfil guardado!', resetSuccess: 'Formulario restablecido', photoUpdated: '¡Foto actualizada!',
    pwChanged: '¡Contraseña cambiada!', pwError: 'Contraseña actual incorrecta',
    pwMismatch: 'Las contraseñas no coinciden', pwTooShort: 'Mínimo 6 caracteres', nameEmpty: 'El nombre no puede estar vacío',
};

const FR: SiteTranslations = {
    navHome: 'Accueil', navFitness: 'Fitness & Réservation', navExercises: 'Exercices',
    navProgress: 'Progrès', navStore: 'Boutique Wellness', navMembership: 'Abonnement', navSettings: 'Paramètres',
    saveChanges: 'Enregistrer', saving: 'Enregistrement…', cancel: 'Annuler', close: 'Fermer', learnMore: 'En savoir plus',
    addToBag: 'Ajouter au panier', added: 'Ajouté', checkout: 'Commander', joinNow: 'Rejoindre', upgrade: 'Améliorer',
    dashWelcome: 'Ravi de vous voir,', dashStreak: 'Jours consécutifs', dashDays: 'Jours', dashCheckIn: 'S\'enregistrer',
    dashCheckedIn: 'Enregistré aujourd\'hui', dashAI: 'Régime AI personnalisé', dashBurn: 'Brûlé', dashActive: 'Actif',
    exTitle: 'Exercice', exSubtitle: 'Votre bibliothèque complète d\'entraînements guidés.', exSearch: 'Rechercher…', exAll: 'Tout',
    progTitle: 'Mon', progSubtitle: 'Suivez votre parcours fitness.',
    progStreak: 'jours de suite', progWorkouts: 'Entraînements', progCalories: 'kcal brûlées',
    storeTitle: 'Wellness', storeSubtitle: 'Équipement et nutrition haute performance pour la communauté health.pro.',
    storeSearch: 'Rechercher des produits…', storeAll: 'Tout', storeNutrition: 'Nutrition',
    storeApparel: 'Vêtements', storeEquipment: 'Équipement', storeAccessories: 'Accessoires', storeSupplements: 'Suppléments',
    storeBannerTitle: '30% DE RÉDUCTION NUTRITION', storeBannerCode: 'Utilisez le code HPPRO2026.',
    storeShopNow: 'Acheter maintenant', storeRewards: 'Obtenez HP Rewards',
    storeRewardsDesc: 'Gagnez 5% en HP Coins à chaque achat.', storeJoinRewards: 'Rejoindre Rewards',
    memberTitle: 'Pass', memberSubtitle: 'Gérez votre abonnement et vos informations de facturation.',
    memberActivePlan: 'PLAN ACTIF', memberFreeMsg: 'Vous êtes sur le niveau gratuit. Passez à premium.',
    memberBilling: 'Prochaine facturation:', memberPayment: 'Moyen de paiement:',
    memberUpgrade: 'Mettre à jour', memberCancel: 'Annuler l\'abonnement',
    memberBenefits: 'Vos avantages', memberBenefit1: 'Accès illimité aux salles partenaires',
    memberBenefit2: 'Générateur d\'entraînement AI', memberBenefit3: '15% de réduction en boutique',
    memberBenefit4: 'Analyses avancées', memberBenefit5: 'Réservation prioritaire',
    memberEliteTitle: 'Passer à Elite', memberEliteDesc: 'Coaching personnel dès ₹2,999/mois.', memberViewPlans: 'Voir les plans Elite',
    settingsTitle: 'Compte', settingsSubtitle: 'Configurez votre profil et préférences.',
    tabProfile: 'Profil', tabNotifications: 'Notifications', tabPrivacy: 'Confidentialité', tabLanguage: 'Langue et thème',
    profileSection: 'Informations du profil', changePhoto: 'Changer la photo', photoHint: 'JPG, GIF ou PNG. Max 800K',
    fullName: 'Nom complet', email: 'Adresse e-mail', emailHint: 'L\'e-mail ne peut pas être modifié',
    goal: 'Objectif préféré', fitnessLevel: 'Niveau de forme', reset: 'Réinitialiser',
    notifSection: 'Préférences de notification',
    emailNotif: 'Notifications par e-mail', emailNotifDesc: 'Rapports hebdomadaires et conseils nutritionnels.',
    workoutReminder: 'Rappels d\'entraînement', workoutReminderDesc: 'Rappels quotidiens.',
    weeklyReport: 'Rapports hebdomadaires', weeklyReportDesc: 'Résumé hebdomadaire de performance.',
    progressAlert: 'Alertes de progrès', progressAlertDesc: 'Notification lors d\'un nouveau record.',
    notifNote: 'Enregistrées automatiquement.',
    changePassword: 'Changer le mot de passe', currentPassword: 'Mot de passe actuel', newPassword: 'Nouveau mot de passe', confirmPassword: 'Confirmer',
    updatePassword: 'Mettre à jour', dangerZone: 'Zone dangereuse', deleteAccount: 'Supprimer le compte',
    deleteDesc: 'Suppression permanente du compte. Irréversible.',
    languageTheme: 'Langue et thème', darkMode: 'Mode sombre', darkModeDesc: 'Basculer entre les thèmes.',
    light: 'Clair', dark: 'Sombre', displayLanguage: 'Langue d\'affichage',
    savedSuccess: 'Profil enregistré !', resetSuccess: 'Formulaire réinitialisé', photoUpdated: 'Photo mise à jour !',
    pwChanged: 'Mot de passe changé !', pwError: 'Mot de passe actuel incorrect',
    pwMismatch: 'Les mots de passe ne correspondent pas', pwTooShort: 'Minimum 6 caractères', nameEmpty: 'Le nom ne peut pas être vide',
};

const DE: SiteTranslations = {
    navHome: 'Start', navFitness: 'Fitness & Buchung', navExercises: 'Übungen',
    navProgress: 'Fortschritt', navStore: 'Wellness-Shop', navMembership: 'Mitgliedschaft', navSettings: 'Einstellungen',
    saveChanges: 'Änderungen speichern', saving: 'Speichern…', cancel: 'Abbrechen', close: 'Schließen', learnMore: 'Mehr erfahren',
    addToBag: 'In den Beutel', added: 'Hinzugefügt', checkout: 'Bezahlen', joinNow: 'Jetzt beitreten', upgrade: 'Upgraden',
    dashWelcome: 'Schön, dich zu sehen,', dashStreak: 'Tage Streak', dashDays: 'Tage', dashCheckIn: 'Jetzt einchecken',
    dashCheckedIn: 'Heute eingecheckt', dashAI: 'KI-personalisiertes Regime', dashBurn: 'Verbrannt', dashActive: 'Aktiv',
    exTitle: 'Übungen', exSubtitle: 'Deine vollständige Bibliothek geführter Workouts.', exSearch: 'Übungen suchen…', exAll: 'Alle',
    progTitle: 'Mein', progSubtitle: 'Verfolge deine Fitnessreise.',
    progStreak: 'Tage Streak', progWorkouts: 'Workouts', progCalories: 'kcal verbrannt',
    storeTitle: 'Wellness', storeSubtitle: 'Hochleistungsausrüstung für die health.pro Community.',
    storeSearch: 'Produkte suchen…', storeAll: 'Alle', storeNutrition: 'Ernährung',
    storeApparel: 'Kleidung', storeEquipment: 'Ausrüstung', storeAccessories: 'Zubehör', storeSupplements: 'Supplemente',
    storeBannerTitle: '30% RABATT AUF ERNÄHRUNG', storeBannerCode: 'Code HPPRO2026 beim Checkout.',
    storeShopNow: 'Jetzt einkaufen', storeRewards: 'HP Rewards erhalten',
    storeRewardsDesc: '5% HP Coins bei jedem Kauf verdienen.', storeJoinRewards: 'Rewards beitreten',
    memberTitle: 'Pass', memberSubtitle: 'Verwalte dein Abonnement und Zahlungsdetails.',
    memberActivePlan: 'AKTIVER PLAN', memberFreeMsg: 'Du bist auf dem kostenlosen Basis-Tier. Upgrade für Premium-Funktionen.',
    memberBilling: 'Nächstes Abrechnungsdatum:', memberPayment: 'Zahlungsmethode:',
    memberUpgrade: 'Zahlung aktualisieren', memberCancel: 'Abonnement kündigen',
    memberBenefits: 'Deine Mitgliedsvorteile', memberBenefit1: 'Unbegrenzte Gym-Partner-Zugang',
    memberBenefit2: 'KI-Workout-Generator', memberBenefit3: '15% Rabatt im Shop',
    memberBenefit4: 'Erweiterte Fortschrittsanalyse', memberBenefit5: 'Priorität-Kursbuchung',
    memberEliteTitle: 'Auf Elite upgraden', memberEliteDesc: 'Persönliches Coaching ab ₹2.999/Monat.', memberViewPlans: 'Elite-Pläne ansehen',
    settingsTitle: 'Konto', settingsSubtitle: 'Profil und App-Einstellungen konfigurieren.',
    tabProfile: 'Profil', tabNotifications: 'Benachrichtigungen', tabPrivacy: 'Datenschutz', tabLanguage: 'Sprache & Design',
    profileSection: 'Profilinformationen', changePhoto: 'Foto ändern', photoHint: 'JPG, GIF oder PNG. Max. 800K',
    fullName: 'Vollständiger Name', email: 'E-Mail-Adresse', emailHint: 'E-Mail kann nicht geändert werden',
    goal: 'Bevorzugtes Ziel', fitnessLevel: 'Fitnesslevel', reset: 'Zurücksetzen',
    notifSection: 'Benachrichtigungseinstellungen',
    emailNotif: 'E-Mail-Benachrichtigungen', emailNotifDesc: 'Wöchentliche Berichte und Ernährungstipps.',
    workoutReminder: 'Training-Erinnerungen', workoutReminderDesc: 'Tägliche Trainingserinnerungen.',
    weeklyReport: 'Wöchentliche Berichte', weeklyReportDesc: 'Wöchentliche Leistungszusammenfassung.',
    progressAlert: 'Fortschritts-Alarme', progressAlertDesc: 'Benachrichtigung bei neuem Rekord.',
    notifNote: 'Automatisch gespeichert.',
    changePassword: 'Passwort ändern', currentPassword: 'Aktuelles Passwort', newPassword: 'Neues Passwort', confirmPassword: 'Passwort bestätigen',
    updatePassword: 'Aktualisieren', dangerZone: 'Gefahrenzone', deleteAccount: 'Konto löschen',
    deleteDesc: 'Konto dauerhaft löschen. Nicht rückgängig zu machen.',
    languageTheme: 'Sprache & Design', darkMode: 'Dunkelmodus', darkModeDesc: 'Zwischen hellem und dunklem Design wechseln.',
    light: 'Hell', dark: 'Dunkel', displayLanguage: 'Anzeigesprache',
    savedSuccess: 'Profil gespeichert!', resetSuccess: 'Formular zurückgesetzt', photoUpdated: 'Profilbild aktualisiert!',
    pwChanged: 'Passwort geändert!', pwError: 'Aktuelles Passwort falsch',
    pwMismatch: 'Passwörter stimmen nicht überein', pwTooShort: 'Mindestens 6 Zeichen', nameEmpty: 'Name darf nicht leer sein',
};

const PT: SiteTranslations = {
    navHome: 'Início', navFitness: 'Fitness & Reservas', navExercises: 'Exercícios',
    navProgress: 'Progresso', navStore: 'Loja Wellness', navMembership: 'Associação', navSettings: 'Configurações',
    saveChanges: 'Salvar alterações', saving: 'Salvando…', cancel: 'Cancelar', close: 'Fechar', learnMore: 'Saiba mais',
    addToBag: 'Adicionar à bolsa', added: 'Adicionado', checkout: 'Finalizar compra', joinNow: 'Entrar agora', upgrade: 'Melhorar',
    dashWelcome: 'Que bom ver você,', dashStreak: 'Dias de sequência', dashDays: 'Dias', dashCheckIn: 'Fazer check-in agora',
    dashCheckedIn: 'Check-in feito hoje', dashAI: 'Regime personalizado por IA', dashBurn: 'Queimado', dashActive: 'Ativo',
    exTitle: 'Exercício', exSubtitle: 'Sua biblioteca completa de treinos guiados.', exSearch: 'Pesquisar exercícios…', exAll: 'Tudo',
    progTitle: 'Meu', progSubtitle: 'Acompanhe sua jornada fitness.',
    progStreak: 'dias de sequência', progWorkouts: 'Treinos', progCalories: 'kcal queimadas',
    storeTitle: 'Wellness', storeSubtitle: 'Equipamento e nutrição de alto desempenho para a comunidade health.pro.',
    storeSearch: 'Pesquisar produtos…', storeAll: 'Tudo', storeNutrition: 'Nutrição',
    storeApparel: 'Vestuário', storeEquipment: 'Equipamento', storeAccessories: 'Acessórios', storeSupplements: 'Suplementos',
    storeBannerTitle: '30% DE DESCONTO EM NUTRIÇÃO', storeBannerCode: 'Use o código HPPRO2026.',
    storeShopNow: 'Comprar agora', storeRewards: 'Obtenha HP Rewards',
    storeRewardsDesc: 'Ganhe 5% em HP Coins a cada compra.', storeJoinRewards: 'Entrar no Rewards',
    memberTitle: 'Pass', memberSubtitle: 'Gerencie sua assinatura e detalhes de cobrança.',
    memberActivePlan: 'PLANO ATIVO', memberFreeMsg: 'Você está no nível gratuito. Faça upgrade para acessar funcionalidades premium.',
    memberBilling: 'Próxima data de cobrança:', memberPayment: 'Método de pagamento:',
    memberUpgrade: 'Atualizar pagamento', memberCancel: 'Cancelar assinatura',
    memberBenefits: 'Seus benefícios de membro', memberBenefit1: 'Acesso ilimitado a academias parceiras',
    memberBenefit2: 'Gerador de treino AI', memberBenefit3: '15% de desconto na loja',
    memberBenefit4: 'Análise avançada de progresso', memberBenefit5: 'Reserva prioritária',
    memberEliteTitle: 'Melhorar para Elite', memberEliteDesc: 'Coaching pessoal a partir de ₹2.999/mês.', memberViewPlans: 'Ver planos Elite',
    settingsTitle: 'Conta', settingsSubtitle: 'Configure seu perfil e preferências do aplicativo.',
    tabProfile: 'Perfil', tabNotifications: 'Notificações', tabPrivacy: 'Privacidade', tabLanguage: 'Idioma e tema',
    profileSection: 'Informações do perfil', changePhoto: 'Alterar foto', photoHint: 'JPG, GIF ou PNG. Máx 800K',
    fullName: 'Nome completo', email: 'Endereço de e-mail', emailHint: 'O e-mail não pode ser alterado',
    goal: 'Meta preferida', fitnessLevel: 'Nível de condicionamento', reset: 'Redefinir',
    notifSection: 'Preferências de notificação',
    emailNotif: 'Notificações por e-mail', emailNotifDesc: 'Receba relatórios e dicas de nutrição.',
    workoutReminder: 'Lembretes de treino', workoutReminderDesc: 'Lembretes diários de treino.',
    weeklyReport: 'Relatórios semanais', weeklyReportDesc: 'Resumo semanal de desempenho.',
    progressAlert: 'Alertas de progresso', progressAlertDesc: 'Notificação ao atingir novo recorde.',
    notifNote: 'Salvo automaticamente.',
    changePassword: 'Alterar senha', currentPassword: 'Senha atual', newPassword: 'Nova senha', confirmPassword: 'Confirmar senha',
    updatePassword: 'Atualizar senha', dangerZone: 'Zona de perigo', deleteAccount: 'Excluir conta',
    deleteDesc: 'Exclua permanentemente sua conta. Irreversível.',
    languageTheme: 'Idioma e tema', darkMode: 'Modo escuro', darkModeDesc: 'Alternar entre temas claro e escuro.',
    light: 'Claro', dark: 'Escuro', displayLanguage: 'Idioma de exibição',
    savedSuccess: 'Perfil salvo!', resetSuccess: 'Formulário redefinido', photoUpdated: 'Foto atualizada!',
    pwChanged: 'Senha alterada!', pwError: 'Senha atual incorreta',
    pwMismatch: 'As senhas não coincidem', pwTooShort: 'Mínimo 6 caracteres', nameEmpty: 'O nome não pode estar vazio',
};

export const TRANSLATIONS: Record<LangKey, SiteTranslations> = {
    English: EN, Hindi: HI, Spanish: ES, French: FR, German: DE, Portuguese: PT,
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface LanguageContextType {
    language: LangKey;
    setLanguage: (lang: LangKey) => void;
    t: SiteTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<LangKey>('English');

    useEffect(() => {
        const saved = localStorage.getItem('hp_language') as LangKey | null;
        if (saved && LANGUAGE_OPTIONS.includes(saved)) setLanguageState(saved);
    }, []);

    const setLanguage = useCallback((lang: LangKey) => {
        setLanguageState(lang);
        localStorage.setItem('hp_language', lang);
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
};
