'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { User, Bell, Lock, Globe, Camera, Save, RotateCcw, Eye, EyeOff, Trash2, CheckCircle, AlertCircle, Moon, Sun, Languages } from 'lucide-react';
import styles from './Settings.module.css';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

type Tab = 'profile' | 'notifications' | 'privacy' | 'language';

interface FormData {
    full_name: string;
    goal: string;
    level: string;
}

interface NotifPrefs {
    emailNotifications: boolean;
    workoutReminders: boolean;
    weeklyReports: boolean;
    progressAlerts: boolean;
}

interface Toast {
    type: 'success' | 'error';
    message: string;
}

const GOALS = ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'General Fitness', 'Stress Relief'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Athlete'];

type LangKey = 'English' | 'Hindi' | 'Spanish' | 'French' | 'German' | 'Portuguese';
const LANGUAGE_OPTIONS: LangKey[] = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Portuguese'];

// ── Translations ─────────────────────────────────────────────────────────────
const TRANSLATIONS: Record<LangKey, {
    pageTitle: string; pageSubtitle: string;
    tabProfile: string; tabNotifications: string; tabPrivacy: string; tabLanguage: string;
    profileSection: string; changePhoto: string; photoHint: string;
    fullName: string; email: string; emailHint: string; goal: string; fitnessLevel: string;
    saveChanges: string; saving: string; reset: string;
    notifSection: string; emailNotif: string; emailNotifDesc: string;
    workoutReminder: string; workoutReminderDesc: string;
    weeklyReport: string; weeklyReportDesc: string;
    progressAlert: string; progressAlertDesc: string;
    notifNote: string;
    changePassword: string; currentPassword: string; newPassword: string; confirmPassword: string;
    updatePassword: string; dangerZone: string; deleteAccount: string; deleteDesc: string;
    languageTheme: string; darkMode: string; darkModeDesc: string;
    light: string; dark: string; displayLanguage: string;
    savedSuccess: string; resetSuccess: string; photoUpdated: string; pwChanged: string;
    pwError: string; pwMismatch: string; pwTooShort: string; nameEmpty: string;
}> = {
    English: {
        pageTitle: 'Account', pageSubtitle: 'Configure your profile and application preferences.',
        tabProfile: 'Profile', tabNotifications: 'Notifications', tabPrivacy: 'Privacy & Security', tabLanguage: 'Language & Theme',
        profileSection: 'Profile Information', changePhoto: 'Change Photo', photoHint: 'JPG, GIF or PNG. Max size of 800K',
        fullName: 'Full Name', email: 'Email Address', emailHint: 'Email cannot be changed',
        goal: 'Preferred Goal', fitnessLevel: 'Fitness Level',
        saveChanges: 'Save Changes', saving: 'Saving…', reset: 'Reset',
        notifSection: 'Notification Preferences',
        emailNotif: 'Email Notifications', emailNotifDesc: 'Receive weekly progress reports and nutrition tips.',
        workoutReminder: 'Workout Reminders', workoutReminderDesc: 'Daily reminders to complete your planned workout.',
        weeklyReport: 'Weekly Reports', weeklyReportDesc: 'Get a summary of your weekly fitness performance.',
        progressAlert: 'Progress Alerts', progressAlertDesc: 'Get notified when you hit a new personal record.',
        notifNote: 'Notification preferences are saved automatically.',
        changePassword: 'Change Password', currentPassword: 'Current Password', newPassword: 'New Password', confirmPassword: 'Confirm New Password',
        updatePassword: 'Update Password',
        dangerZone: 'Danger Zone', deleteAccount: 'Delete Account', deleteDesc: 'Permanently delete your account and all associated data. This cannot be undone.',
        languageTheme: 'Language & Theme', darkMode: 'Dark Mode', darkModeDesc: 'Switch between light and dark interface themes.',
        light: 'Light', dark: 'Dark', displayLanguage: 'Display Language',
        savedSuccess: 'Profile saved successfully!', resetSuccess: 'Form reset to saved values', photoUpdated: 'Profile photo updated!',
        pwChanged: 'Password changed successfully!', pwError: 'Current password is incorrect',
        pwMismatch: 'New passwords do not match', pwTooShort: 'New password must be at least 6 characters', nameEmpty: 'Full name cannot be empty',
    },
    Hindi: {
        pageTitle: 'खाता', pageSubtitle: 'अपनी प्रोफ़ाइल और ऐप प्राथमिकताएं कॉन्फ़िगर करें।',
        tabProfile: 'प्रोफ़ाइल', tabNotifications: 'सूचनाएं', tabPrivacy: 'गोपनीयता और सुरक्षा', tabLanguage: 'भाषा और थीम',
        profileSection: 'प्रोफ़ाइल जानकारी', changePhoto: 'फ़ोटो बदलें', photoHint: 'JPG, GIF या PNG। अधिकतम 800K',
        fullName: 'पूरा नाम', email: 'ईमेल पता', emailHint: 'ईमेल बदला नहीं जा सकता',
        goal: 'पसंदीदा लक्ष्य', fitnessLevel: 'फिटनेस स्तर',
        saveChanges: 'परिवर्तन सहेजें', saving: 'सहेजा जा रहा है…', reset: 'रीसेट',
        notifSection: 'सूचना प्राथमिकताएं',
        emailNotif: 'ईमेल सूचनाएं', emailNotifDesc: 'साप्ताहिक प्रगति रिपोर्ट और पोषण सुझाव प्राप्त करें।',
        workoutReminder: 'वर्कआउट रिमाइंडर', workoutReminderDesc: 'अपने वर्कआउट को पूरा करने के लिए दैनिक रिमाइंडर।',
        weeklyReport: 'साप्ताहिक रिपोर्ट', weeklyReportDesc: 'अपनी साप्ताहिक फिटनेस प्रदर्शन का सारांश प्राप्त करें।',
        progressAlert: 'प्रगति अलर्ट', progressAlertDesc: 'नया व्यक्तिगत रिकॉर्ड बनाने पर सूचित हों।',
        notifNote: 'सूचना प्राथमिकताएं स्वचालित रूप से सहेजी जाती हैं।',
        changePassword: 'पासवर्ड बदलें', currentPassword: 'वर्तमान पासवर्ड', newPassword: 'नया पासवर्ड', confirmPassword: 'नए पासवर्ड की पुष्टि करें',
        updatePassword: 'पासवर्ड अपडेट करें',
        dangerZone: 'खतरनाक क्षेत्र', deleteAccount: 'खाता हटाएं', deleteDesc: 'अपना खाता और सभी संबद्ध डेटा स्थायी रूप से हटाएं। यह पूर्ववत नहीं किया जा सकता।',
        languageTheme: 'भाषा और थीम', darkMode: 'डार्क मोड', darkModeDesc: 'लाइट और डार्क थीम के बीच स्विच करें।',
        light: 'लाइट', dark: 'डार्क', displayLanguage: 'प्रदर्शन भाषा',
        savedSuccess: 'प्रोफ़ाइल सफलतापूर्वक सहेजी गई!', resetSuccess: 'फ़ॉर्म रीसेट किया गया', photoUpdated: 'प्रोफ़ाइल फ़ोटो अपडेट की गई!',
        pwChanged: 'पासवर्ड सफलतापूर्वक बदला गया!', pwError: 'वर्तमान पासवर्ड गलत है',
        pwMismatch: 'नए पासवर्ड मेल नहीं खाते', pwTooShort: 'नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए', nameEmpty: 'पूरा नाम खाली नहीं हो सकता',
    },
    Spanish: {
        pageTitle: 'Cuenta', pageSubtitle: 'Configura tu perfil y preferencias de la aplicación.',
        tabProfile: 'Perfil', tabNotifications: 'Notificaciones', tabPrivacy: 'Privacidad y seguridad', tabLanguage: 'Idioma y tema',
        profileSection: 'Información del perfil', changePhoto: 'Cambiar foto', photoHint: 'JPG, GIF o PNG. Tamaño máximo 800K',
        fullName: 'Nombre completo', email: 'Correo electrónico', emailHint: 'El correo no se puede cambiar',
        goal: 'Meta preferida', fitnessLevel: 'Nivel de condición física',
        saveChanges: 'Guardar cambios', saving: 'Guardando…', reset: 'Restablecer',
        notifSection: 'Preferencias de notificaciones',
        emailNotif: 'Notificaciones por correo', emailNotifDesc: 'Recibe informes semanales de progreso y consejos nutricionales.',
        workoutReminder: 'Recordatorios de entrenamiento', workoutReminderDesc: 'Recordatorios diarios para completar tu entrenamiento.',
        weeklyReport: 'Informes semanales', weeklyReportDesc: 'Obtén un resumen de tu rendimiento semanal.',
        progressAlert: 'Alertas de progreso', progressAlertDesc: 'Recibe notificaciones al lograr un nuevo récord personal.',
        notifNote: 'Las preferencias de notificación se guardan automáticamente.',
        changePassword: 'Cambiar contraseña', currentPassword: 'Contraseña actual', newPassword: 'Nueva contraseña', confirmPassword: 'Confirmar nueva contraseña',
        updatePassword: 'Actualizar contraseña',
        dangerZone: 'Zona de peligro', deleteAccount: 'Eliminar cuenta', deleteDesc: 'Elimina permanentemente tu cuenta y todos los datos. Esto no se puede deshacer.',
        languageTheme: 'Idioma y tema', darkMode: 'Modo oscuro', darkModeDesc: 'Cambia entre temas claro y oscuro.',
        light: 'Claro', dark: 'Oscuro', displayLanguage: 'Idioma de visualización',
        savedSuccess: '¡Perfil guardado exitosamente!', resetSuccess: 'Formulario restablecido', photoUpdated: '¡Foto de perfil actualizada!',
        pwChanged: '¡Contraseña cambiada exitosamente!', pwError: 'La contraseña actual es incorrecta',
        pwMismatch: 'Las nuevas contraseñas no coinciden', pwTooShort: 'La nueva contraseña debe tener al menos 6 caracteres', nameEmpty: 'El nombre completo no puede estar vacío',
    },
    French: {
        pageTitle: 'Compte', pageSubtitle: 'Configurez votre profil et les préférences de l\'application.',
        tabProfile: 'Profil', tabNotifications: 'Notifications', tabPrivacy: 'Confidentialité', tabLanguage: 'Langue et thème',
        profileSection: 'Informations du profil', changePhoto: 'Changer la photo', photoHint: 'JPG, GIF ou PNG. Max 800K',
        fullName: 'Nom complet', email: 'Adresse e-mail', emailHint: 'L\'e-mail ne peut pas être modifié',
        goal: 'Objectif préféré', fitnessLevel: 'Niveau de forme',
        saveChanges: 'Enregistrer', saving: 'Enregistrement…', reset: 'Réinitialiser',
        notifSection: 'Préférences de notification',
        emailNotif: 'Notifications par e-mail', emailNotifDesc: 'Recevez des rapports hebdomadaires et des conseils nutritionnels.',
        workoutReminder: 'Rappels d\'entraînement', workoutReminderDesc: 'Rappels quotidiens pour compléter votre entraînement.',
        weeklyReport: 'Rapports hebdomadaires', weeklyReportDesc: 'Obtenez un résumé de vos performances hebdomadaires.',
        progressAlert: 'Alertes de progrès', progressAlertDesc: 'Soyez notifié quand vous battez un record personnel.',
        notifNote: 'Les préférences de notification sont enregistrées automatiquement.',
        changePassword: 'Changer le mot de passe', currentPassword: 'Mot de passe actuel', newPassword: 'Nouveau mot de passe', confirmPassword: 'Confirmer le mot de passe',
        updatePassword: 'Mettre à jour',
        dangerZone: 'Zone dangereuse', deleteAccount: 'Supprimer le compte', deleteDesc: 'Supprimez définitivement votre compte. Cette action est irréversible.',
        languageTheme: 'Langue et thème', darkMode: 'Mode sombre', darkModeDesc: 'Basculer entre les thèmes clair et sombre.',
        light: 'Clair', dark: 'Sombre', displayLanguage: 'Langue d\'affichage',
        savedSuccess: 'Profil enregistré avec succès !', resetSuccess: 'Formulaire réinitialisé', photoUpdated: 'Photo de profil mise à jour !',
        pwChanged: 'Mot de passe changé avec succès !', pwError: 'Mot de passe actuel incorrect',
        pwMismatch: 'Les nouveaux mots de passe ne correspondent pas', pwTooShort: 'Le mot de passe doit comporter au moins 6 caractères', nameEmpty: 'Le nom complet ne peut pas être vide',
    },
    German: {
        pageTitle: 'Konto', pageSubtitle: 'Konfigurieren Sie Ihr Profil und die App-Einstellungen.',
        tabProfile: 'Profil', tabNotifications: 'Benachrichtigungen', tabPrivacy: 'Datenschutz', tabLanguage: 'Sprache & Design',
        profileSection: 'Profilinformationen', changePhoto: 'Foto ändern', photoHint: 'JPG, GIF oder PNG. Max. 800K',
        fullName: 'Vollständiger Name', email: 'E-Mail-Adresse', emailHint: 'E-Mail kann nicht geändert werden',
        goal: 'Bevorzugtes Ziel', fitnessLevel: 'Fitnesslevel',
        saveChanges: 'Änderungen speichern', saving: 'Speichern…', reset: 'Zurücksetzen',
        notifSection: 'Benachrichtigungseinstellungen',
        emailNotif: 'E-Mail-Benachrichtigungen', emailNotifDesc: 'Wöchentliche Fortschrittsberichte und Ernährungstipps erhalten.',
        workoutReminder: 'Training-Erinnerungen', workoutReminderDesc: 'Tägliche Erinnerungen für Ihr geplantes Training.',
        weeklyReport: 'Wöchentliche Berichte', weeklyReportDesc: 'Erhalten Sie eine Zusammenfassung Ihrer wöchentlichen Leistung.',
        progressAlert: 'Fortschritts-Alarme', progressAlertDesc: 'Benachrichtigung bei neuem persönlichen Rekord.',
        notifNote: 'Benachrichtigungseinstellungen werden automatisch gespeichert.',
        changePassword: 'Passwort ändern', currentPassword: 'Aktuelles Passwort', newPassword: 'Neues Passwort', confirmPassword: 'Passwort bestätigen',
        updatePassword: 'Passwort aktualisieren',
        dangerZone: 'Gefahrenzone', deleteAccount: 'Konto löschen', deleteDesc: 'Konto und alle Daten dauerhaft löschen. Dies kann nicht rückgängig gemacht werden.',
        languageTheme: 'Sprache & Design', darkMode: 'Dunkelmodus', darkModeDesc: 'Zwischen hellem und dunklem Design wechseln.',
        light: 'Hell', dark: 'Dunkel', displayLanguage: 'Anzeigesprache',
        savedSuccess: 'Profil erfolgreich gespeichert!', resetSuccess: 'Formular zurückgesetzt', photoUpdated: 'Profilbild aktualisiert!',
        pwChanged: 'Passwort erfolgreich geändert!', pwError: 'Aktuelles Passwort falsch',
        pwMismatch: 'Neue Passwörter stimmen nicht überein', pwTooShort: 'Neues Passwort muss mindestens 6 Zeichen lang sein', nameEmpty: 'Vollständiger Name darf nicht leer sein',
    },
    Portuguese: {
        pageTitle: 'Conta', pageSubtitle: 'Configure seu perfil e as preferências do aplicativo.',
        tabProfile: 'Perfil', tabNotifications: 'Notificações', tabPrivacy: 'Privacidade', tabLanguage: 'Idioma e tema',
        profileSection: 'Informações do perfil', changePhoto: 'Alterar foto', photoHint: 'JPG, GIF ou PNG. Máx 800K',
        fullName: 'Nome completo', email: 'Endereço de e-mail', emailHint: 'O e-mail não pode ser alterado',
        goal: 'Meta preferida', fitnessLevel: 'Nível de condicionamento',
        saveChanges: 'Salvar alterações', saving: 'Salvando…', reset: 'Redefinir',
        notifSection: 'Preferências de notificação',
        emailNotif: 'Notificações por e-mail', emailNotifDesc: 'Receba relatórios semanais de progresso e dicas de nutrição.',
        workoutReminder: 'Lembretes de treino', workoutReminderDesc: 'Lembretes diários para completar seu treino.',
        weeklyReport: 'Relatórios semanais', weeklyReportDesc: 'Obtenha um resumo do seu desempenho semanal.',
        progressAlert: 'Alertas de progresso', progressAlertDesc: 'Seja notificado ao atingir um novo recorde pessoal.',
        notifNote: 'As preferências de notificação são salvas automaticamente.',
        changePassword: 'Alterar senha', currentPassword: 'Senha atual', newPassword: 'Nova senha', confirmPassword: 'Confirmar nova senha',
        updatePassword: 'Atualizar senha',
        dangerZone: 'Zona de perigo', deleteAccount: 'Excluir conta', deleteDesc: 'Exclua permanentemente sua conta e todos os dados. Isso não pode ser desfeito.',
        languageTheme: 'Idioma e tema', darkMode: 'Modo escuro', darkModeDesc: 'Alternar entre temas claro e escuro.',
        light: 'Claro', dark: 'Escuro', displayLanguage: 'Idioma de exibição',
        savedSuccess: 'Perfil salvo com sucesso!', resetSuccess: 'Formulário redefinido', photoUpdated: 'Foto de perfil atualizada!',
        pwChanged: 'Senha alterada com sucesso!', pwError: 'Senha atual incorreta',
        pwMismatch: 'As novas senhas não coincidem', pwTooShort: 'A nova senha deve ter pelo menos 6 caracteres', nameEmpty: 'O nome completo não pode estar vazio',
    },
};

export default function SettingsPage() {
    const { user, updateMetadata, signOut } = useAuth();

    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<Toast | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile form
    const [formData, setFormData] = useState<FormData>({
        full_name: user?.user_metadata?.full_name || '',
        goal: user?.user_metadata?.goal || 'General Fitness',
        level: user?.user_metadata?.level || 'Beginner',
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        user?.user_metadata?.avatar_url || null
    );

    // Notifications
    const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>({
        emailNotifications: true,
        workoutReminders: true,
        weeklyReports: false,
        progressAlerts: true,
    });

    // Privacy
    const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
    const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });

    // Language & Theme
    const [language, setLanguage] = useState<LangKey>('English');
    const [darkMode, setDarkMode] = useState(false);

    // Shortcut to current translation
    const t = TRANSLATIONS[language];

    // ── Hydration from localStorage ──────────────────────────────────────────
    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.user_metadata?.full_name || '',
                goal: user.user_metadata?.goal || 'General Fitness',
                level: user.user_metadata?.level || 'Beginner',
            });
            setAvatarPreview(user.user_metadata?.avatar_url || null);
        }
    }, [user]);

    useEffect(() => {
        const saved = localStorage.getItem('hp_notif_prefs');
        if (saved) setNotifPrefs(JSON.parse(saved));

        const savedLang = localStorage.getItem('hp_language') as LangKey | null;
        if (savedLang && LANGUAGE_OPTIONS.includes(savedLang)) setLanguage(savedLang);

        const savedTheme = localStorage.getItem('hp_theme');
        const isDark = savedTheme === 'dark' || document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            setDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const showToast = useCallback((type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    }, []);

    // ── Profile ──────────────────────────────────────────────────────────────
    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 800 * 1024) { showToast('error', 'Image must be under 800 KB'); return; }
        const reader = new FileReader();
        reader.onloadend = async () => {
            const dataUrl = reader.result as string;
            setAvatarPreview(dataUrl);
            await updateMetadata({ avatar_url: dataUrl });
            showToast('success', t.photoUpdated);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleSaveProfile = async () => {
        if (!formData.full_name.trim()) { showToast('error', t.nameEmpty); return; }
        setSaving(true);
        try {
            await updateMetadata({ full_name: formData.full_name.trim(), goal: formData.goal, level: formData.level });
            showToast('success', t.savedSuccess);
        } catch { showToast('error', 'Failed to save. Please try again.'); }
        finally { setSaving(false); }
    };

    const handleResetProfile = () => {
        setFormData({
            full_name: user?.user_metadata?.full_name || '',
            goal: user?.user_metadata?.goal || 'General Fitness',
            level: user?.user_metadata?.level || 'Beginner',
        });
        setAvatarPreview(user?.user_metadata?.avatar_url || null);
        showToast('success', t.resetSuccess);
    };

    // ── Notifications ────────────────────────────────────────────────────────
    const toggleNotif = (key: keyof NotifPrefs) => {
        const updated = { ...notifPrefs, [key]: !notifPrefs[key] };
        setNotifPrefs(updated);
        localStorage.setItem('hp_notif_prefs', JSON.stringify(updated));
    };

    // ── Privacy ──────────────────────────────────────────────────────────────
    const handleChangePassword = async () => {
        if (!pwForm.current.trim()) { showToast('error', t.currentPassword + ' required'); return; }
        if (pwForm.newPw.length < 6) { showToast('error', t.pwTooShort); return; }
        if (pwForm.newPw !== pwForm.confirm) { showToast('error', t.pwMismatch); return; }
        if (!user?.email) { showToast('error', 'You must be logged in to change password.'); return; }

        setSaving(true);
        try {
            // 1) Verify current password by trying a sign-in with the same user
            const { error: verifyError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: pwForm.current,
            });
            if (verifyError) {
                showToast('error', t.pwError);
                return;
            }

            // 2) Update password in Supabase
            const { error: updateError } = await supabase.auth.updateUser({ password: pwForm.newPw });
            if (updateError) {
                showToast('error', updateError.message || 'Failed to update password.');
                return;
            }

            setPwForm({ current: '', newPw: '', confirm: '' });
            showToast('success', t.pwChanged);
        } catch {
            showToast('error', 'Failed to update password. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm('⚠️ ' + t.deleteDesc);
        if (!confirmed) return;
        try {
            await signOut();
            showToast('success', 'You have been logged out. Account deletion is not yet implemented.');
        } catch {
            showToast('error', 'Failed to log out. Please try again.');
        }
    };

    // ── Language & Theme ─────────────────────────────────────────────────────
    const handleLanguageChange = (lang: LangKey) => {
        setLanguage(lang);
        localStorage.setItem('hp_language', lang);
        // Show success toast in the NEW language
        setTimeout(() => showToast('success', TRANSLATIONS[lang].savedSuccess.replace('Profile', 'Language').replace('Profil', 'Langue').replace('Perfil', 'Idioma').replace('पर्फाइल', 'भाषा')), 100);
    };

    const handleDarkModeToggle = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
        localStorage.setItem('hp_theme', next ? 'dark' : 'light');
        showToast('success', `${next ? t.dark : t.light} mode enabled`);
    };

    const avatarInitial = formData.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'profile', label: t.tabProfile, icon: <User size={18} /> },
        { id: 'notifications', label: t.tabNotifications, icon: <Bell size={18} /> },
        { id: 'privacy', label: t.tabPrivacy, icon: <Lock size={18} /> },
        { id: 'language', label: t.tabLanguage, icon: <Globe size={18} /> },
    ];

    return (
        <div className={styles.container}>
            {toast && (
                <div className={`${styles.toast} ${styles[toast.type]}`}>
                    {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}

            <header className={styles.header}>
                <h1 className={styles.title}>{t.pageTitle} <span className={styles.gradientText}>Settings</span></h1>
                <p className={styles.subtitle}>{t.pageSubtitle}</p>
            </header>

            <div className={styles.content}>
                <aside className={styles.settingsNav}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.navItem} ${activeTab === tab.id ? styles.activeNav : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </aside>

                <main className={styles.mainContent}>

                    {/* ── PROFILE TAB ── */}
                    {activeTab === 'profile' && (
                        <>
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t.profileSection}</h2>
                                <div className={styles.profileHeader}>
                                    <div className={styles.avatarWrapper}>
                                        <div className={styles.avatar}>
                                            {avatarPreview ? <img src={avatarPreview} alt="Profile" className={styles.avatarImg} /> : avatarInitial}
                                        </div>
                                        <button className={styles.cameraBtn} onClick={handleAvatarClick} title={t.changePhoto}>
                                            <Camera size={14} />
                                        </button>
                                    </div>
                                    <div>
                                        <button className={styles.changePhotoBtn} onClick={handleAvatarClick}>{t.changePhoto}</button>
                                        <p className={styles.avatarHint}>{t.photoHint}</p>
                                        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" style={{ display: 'none' }} onChange={handleAvatarChange} />
                                    </div>
                                </div>

                                <div className={styles.formGrid}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>{t.fullName}</label>
                                        <input className={styles.inputField} value={formData.full_name} onChange={e => setFormData(f => ({ ...f, full_name: e.target.value }))} />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>{t.email}</label>
                                        <input className={`${styles.inputField} ${styles.disabled}`} value={user?.email || ''} disabled />
                                        <p className={styles.helperText}>{t.emailHint}</p>
                                    </div>
                                </div>
                                <div className={styles.formGrid}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>{t.goal}</label>
                                        <select className={styles.selectField} value={formData.goal} onChange={e => setFormData(f => ({ ...f, goal: e.target.value }))}>
                                            {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label}>{t.fitnessLevel}</label>
                                        <select className={styles.selectField} value={formData.level} onChange={e => setFormData(f => ({ ...f, level: e.target.value }))}>
                                            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <div className={styles.formActions}>
                                <button className={styles.btnPrimary} onClick={handleSaveProfile} disabled={saving}>
                                    <Save size={16} />{saving ? t.saving : t.saveChanges}
                                </button>
                                <button className={styles.btnGhost} onClick={handleResetProfile} disabled={saving}>
                                    <RotateCcw size={16} />{t.reset}
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── NOTIFICATIONS TAB ── */}
                    {activeTab === 'notifications' && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t.notifSection}</h2>
                            {([
                                { key: 'emailNotifications', title: t.emailNotif, desc: t.emailNotifDesc },
                                { key: 'workoutReminders', title: t.workoutReminder, desc: t.workoutReminderDesc },
                                { key: 'weeklyReports', title: t.weeklyReport, desc: t.weeklyReportDesc },
                                { key: 'progressAlerts', title: t.progressAlert, desc: t.progressAlertDesc },
                            ] as { key: keyof NotifPrefs; title: string; desc: string }[]).map(item => (
                                <div key={item.key} className={styles.toggleRow}>
                                    <div><h3>{item.title}</h3><p>{item.desc}</p></div>
                                    <button className={`${styles.toggle} ${notifPrefs[item.key] ? styles.toggleOn : styles.toggleOff}`} onClick={() => toggleNotif(item.key)}>
                                        <div className={styles.toggleHandle} />
                                    </button>
                                </div>
                            ))}
                            <div className={styles.notifNote}><Bell size={14} /><span>{t.notifNote}</span></div>
                        </section>
                    )}

                    {/* ── PRIVACY TAB ── */}
                    {activeTab === 'privacy' && (
                        <>
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t.changePassword}</h2>
                                <div className={styles.pwForm}>
                                    {([
                                        { key: 'current', label: t.currentPassword, placeholder: '••••••••' },
                                        { key: 'newPw', label: t.newPassword, placeholder: '••••••••' },
                                        { key: 'confirm', label: t.confirmPassword, placeholder: '••••••••' },
                                    ] as { key: keyof typeof pwForm; label: string; placeholder: string }[]).map(f => (
                                        <div key={f.key} className={styles.fieldGroup}>
                                            <label className={styles.label}>{f.label}</label>
                                            <div className={styles.pwInputWrapper}>
                                                <input className={styles.inputField} type={showPw[f.key] ? 'text' : 'password'} value={pwForm[f.key]} onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                                                <button className={styles.eyeBtn} type="button" onClick={() => setShowPw(s => ({ ...s, [f.key]: !s[f.key] }))}>
                                                    {showPw[f.key] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.formActions}>
                                    <button className={styles.btnPrimary} onClick={handleChangePassword} disabled={saving}>
                                        <Save size={16} />{saving ? t.saving : t.updatePassword}
                                    </button>
                                </div>
                            </section>

                            <section className={`${styles.section} ${styles.dangerZone}`}>
                                <h2 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>{t.dangerZone}</h2>
                                <div className={styles.dangerRow}>
                                    <div>
                                        <h3>{t.deleteAccount}</h3>
                                        <p>{t.deleteDesc}</p>
                                    </div>
                                    <button className={styles.btnDanger} onClick={handleDeleteAccount}>
                                        <Trash2 size={16} />{t.deleteAccount}
                                    </button>
                                </div>
                            </section>
                        </>
                    )}

                    {/* ── LANGUAGE & THEME TAB ── */}
                    {activeTab === 'language' && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t.languageTheme}</h2>

                            <div className={styles.toggleRow}>
                                <div><h3>{t.darkMode}</h3><p>{t.darkModeDesc}</p></div>
                                <button className={`${styles.toggle} ${darkMode ? styles.toggleOn : styles.toggleOff}`} onClick={handleDarkModeToggle}>
                                    <div className={styles.toggleHandle} />
                                </button>
                            </div>

                            <div className={styles.themeIcons}>
                                <div className={`${styles.themeCard} ${!darkMode ? styles.themeCardActive : ''}`} onClick={() => { if (darkMode) handleDarkModeToggle(); }}>
                                    <Sun size={28} /><span>{t.light}</span>
                                </div>
                                <div className={`${styles.themeCard} ${darkMode ? styles.themeCardActive : ''}`} onClick={() => { if (!darkMode) handleDarkModeToggle(); }}>
                                    <Moon size={28} /><span>{t.dark}</span>
                                </div>
                            </div>

                            <div className={styles.langSection}>
                                <div className={styles.langHeader}>
                                    <Languages size={18} /><h3>{t.displayLanguage}</h3>
                                </div>
                                <div className={styles.langGrid}>
                                    {LANGUAGE_OPTIONS.map(lang => (
                                        <button key={lang} className={`${styles.langBtn} ${language === lang ? styles.langBtnActive : ''}`} onClick={() => handleLanguageChange(lang)}>
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                                <p style={{ marginTop: 16, fontSize: 13, color: 'var(--color-text-mid)' }}>
                                    {language !== 'English' ? `Selected: ${language} — UI labels above are now translated` : 'Select a language to translate the settings UI'}
                                </p>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
