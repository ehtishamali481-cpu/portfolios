import React, { useState, useEffect, useCallback } from 'react';
import { Project, Experience, Skill, Message, Certificate, AnalyticsSummary } from '../types';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  FolderGit2,
  Briefcase,
  Layers,
  Mail,
  Shield,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Eye,
  LogOut,
  RefreshCw,
  Search,
  ExternalLink,
  Github,
  Check,
  KeyRound,
  Inbox,
  AlertCircle,
  Award,
  Star,
  Activity,
  Smartphone,
  Monitor,
  Tablet as TabletIcon,
  Globe,
  MapPin,
  Users,
  Laptop,
} from 'lucide-react';
const avatarImg = '/images/profile.jpeg';

interface DashboardProps {
  token: string;
  onLogout: () => void;
  onTokenRefresh?: (newToken: string) => void;
}

type TabType = 'messages' | 'projects' | 'skills' | 'experiences' | 'certificates' | 'security' | 'analytics';

const Dashboard = ({ token, onLogout, onTokenRefresh }: DashboardProps) => {
  const { refetchAll } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);


  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    image: '',
    tech: '',
    github: '',
    link: '',
    featured: false,
  });


  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState<{
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'other' | 'testing';
  }>({
    name: '',
    category: 'frontend',
  });


  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    duration: '',
    description: '',
  });
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [certForm, setCertForm] = useState({
    title: '',
    image: '',
  });

  const showNotification = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  const getAuthHeaders = useCallback(() => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  const parseList = (res: unknown): any[] => {
    if (Array.isArray(res)) return res;
    if (res && typeof res === 'object' && 'data' in res && Array.isArray((res as { data: unknown }).data)) {
      return (res as { data: any[] }).data;
    }
    return [];
  };


  const fetchAnalytics = useCallback(async () => {
    setIsAnalyticsLoading(true);
    try {
      const res = await fetch('/api/analytics', { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setIsAnalyticsLoading(false);
    }
  }, [getAuthHeaders]);

  const handleClearAnalytics = async () => {
    if (!window.confirm('Are you sure you want to reset all visitor analytics data? This will clear all recorded page views.')) {
      return;
    }
    try {
      const res = await fetch('/api/analytics', {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showNotification('success', 'Visitor analytics data cleared successfully.');
        fetchAnalytics();
      } else {
        const err = await res.json();
        showNotification('error', err.error || 'Failed to clear analytics.');
      }
    } catch {
      showNotification('error', 'Network error clearing analytics.');
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [msgRes, projRes, skillRes, expRes, certRes, analyticsRes] = await Promise.all([
        fetch('/api/messages', { headers: getAuthHeaders() }),
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experiences'),
        fetch('/api/certificates'),
        fetch('/api/analytics', { headers: getAuthHeaders() }),
      ]);

      if (msgRes.status === 401 || msgRes.status === 403) {
        onLogout();
        return;
      }

      const [msgData, projData, skillData, expData, certData] = await Promise.all([
        msgRes.json(),
        projRes.json(),
        skillRes.json(),
        expRes.json(),
        certRes.json(),
      ]);

      if (analyticsRes.ok) {
        const aData = await analyticsRes.json();
        setAnalyticsData(aData);
      }

      setMessages(parseList(msgData));
      setProjects(parseList(projData));
      setSkills(parseList(skillData));
      setExperiences(parseList(expData));
      setCertificates(parseList(certData));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showNotification('error', 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, onLogout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleRead = async (msg: Message) => {
    const msgId = msg.id || msg._id;
    if (!msgId) return;

    try {
      const response = await fetch(`/api/messages/${msgId}/read`, {
        method: 'PUT',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setMessages((prev) =>
          prev.map((m) => ((m.id || m._id) === msgId ? { ...m, isRead: !m.isRead, read: !m.read } : m))
        );
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to update message status.');
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`/api/messages/${msgId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setMessages((prev) => prev.filter((m) => (m.id || m._id) !== msgId));
        showNotification('success', 'Message deleted successfully.');
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to delete message.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete message.');
    }
  };


  const openProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        description: proj.description,
        category: proj.category,
        image: proj.image || '',
        tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : '',
        github: proj.github || '',
        link: proj.link || '',
        featured: proj.featured ?? false,
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        category: 'Full Stack',
        image: '',
        tech: 'React, Node.js, Express, MongoDB',
        github: '',
        link: '',
        featured: false,
      });
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projectForm.tech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      image: projectForm.image,
      tech: techArray,
      github: projectForm.github,
      link: projectForm.link,
      featured: projectForm.featured,
    };

    try {
      let response;
      if (editingProject) {
        const id = editingProject.id || editingProject._id;
        response = await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('/api/projects', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        showNotification(
          'success',
          `Project ${editingProject ? 'updated' : 'added'} successfully.`
        );
        setIsProjectModalOpen(false);
        fetchData();
        refetchAll();
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to save project.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Error saving project.');
    }
  };

  const handleDeleteProject = async (projId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await fetch(`/api/projects/${projId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setProjects((prev) => prev.filter((p) => (p.id || p._id) !== projId));
        refetchAll();
        showNotification('success', 'Project deleted successfully.');
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to delete project.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete project.');
    }
  };
  const handleToggleFeatured = async (proj: Project) => {
    const projId = proj.id || proj._id;
    if (!projId) return;
    const newFeatured = !proj.featured;
    try {
      const response = await fetch(`/api/projects/${projId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ featured: newFeatured }),
      });
      if (response.ok) {
        setProjects((prev) =>
          prev.map((p) => ((p.id || p._id) === projId ? { ...p, featured: newFeatured } : p))
        );
        refetchAll();
        showNotification('success', `Project ${newFeatured ? 'marked as featured' : 'removed from featured'}.`);
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to update featured status.');
    }
  };
  const openSkillModal = (sk?: Skill) => {
    if (sk) {
      setEditingSkill(sk);
      setSkillForm({
        name: sk.name,
        category: sk.category,
      });
    } else {
      setEditingSkill(null);
      setSkillForm({
        name: '',
        category: 'frontend',
      });
    }
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (editingSkill) {
        const id = editingSkill.id || editingSkill._id;
        response = await fetch(`/api/skills/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(skillForm),
        });
      } else {
        response = await fetch('/api/skills', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(skillForm),
        });
      }

      if (response.ok) {
        showNotification('success', `Skill ${editingSkill ? 'updated' : 'added'} successfully.`);
        setIsSkillModalOpen(false);
        try { localStorage.removeItem('portfolio_data_cache'); } catch (_) { }
        fetchData();
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to save skill.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Error saving skill.');
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      const response = await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setSkills((prev) => prev.filter((s) => (s.id || s._id) !== skillId));
        try { localStorage.removeItem('portfolio_data_cache'); } catch (_) { }
        showNotification('success', 'Skill deleted successfully.');
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to delete skill.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete skill.');
    }
  };

  const openExpModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setExpForm({
        role: exp.role,
        company: exp.company,
        duration: exp.duration,
        description: exp.description,
      });
    } else {
      setEditingExp(null);
      setExpForm({
        role: '',
        company: '',
        duration: '',
        description: '',
      });
    }
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (editingExp) {
        const id = editingExp.id || editingExp._id;
        response = await fetch(`/api/experiences/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(expForm),
        });
      } else {
        response = await fetch('/api/experiences', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(expForm),
        });
      }

      if (response.ok) {
        showNotification(
          'success',
          `Experience ${editingExp ? 'updated' : 'added'} successfully.`
        );
        setIsExpModalOpen(false);
        fetchData();
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to save experience.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Error saving experience.');
    }
  };

  const handleDeleteExp = async (expId: string) => {
    if (!window.confirm('Are you sure you want to delete this experience record?')) return;
    try {
      const response = await fetch(`/api/experiences/${expId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setExperiences((prev) => prev.filter((e) => (e.id || e._id) !== expId));
        showNotification('success', 'Experience deleted successfully.');
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to delete experience.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete experience.');
    }
  };
  const openCertModal = (cert?: Certificate) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({ title: cert.title, image: cert.image });
    } else {
      setEditingCert(null);
      setCertForm({ title: '', image: '' });
    }
    setIsCertModalOpen(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: certForm.title.trim(),
      image: certForm.image.trim(),
    };

    try {
      let response;
      if (editingCert) {
        const id = editingCert.id || editingCert._id;
        response = await fetch(`/api/certificates/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('/api/certificates', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        showNotification(
          'success',
          `Certificate ${editingCert ? 'updated' : 'added'} successfully.`
        );
        setIsCertModalOpen(false);
        fetchData();
        refetchAll();
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to save certificate.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Error saving certificate.');
    }
  };

  const handleDeleteCert = async (certId: string) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      const response = await fetch(`/api/certificates/${certId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setCertificates((prev) => prev.filter((c) => (c.id || c._id) !== certId));
        refetchAll();
        showNotification('success', 'Certificate deleted successfully.');
      } else {
        const result = await response.json();
        showNotification('error', result.error || 'Failed to delete certificate.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Failed to delete certificate.');
    }
  };

  const handleRefreshToken = async () => {
    setIsRefreshingToken(true);
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (result.success && result.token) {
        if (onTokenRefresh) onTokenRefresh(result.token);
        showNotification('success', 'Session token refreshed! Your session is valid for another 24 hours.');
      } else {
        showNotification('error', result.error || 'Failed to refresh token. Please log in again.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Error refreshing session token.');
    } finally {
      setIsRefreshingToken(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('error', 'New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showNotification('error', 'Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const result = await response.json();
      if (result.success) {
        showNotification('success', 'Admin password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showNotification('error', result.error || 'Failed to change password.');
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Error changing password.');
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.isRead && !m.read).length;

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-4xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-black">
              E
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">Admin Console</h1>
              <p className="text-xs text-zinc-500">Portfolio Data & Message Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleRefreshToken}
              disabled={isRefreshingToken}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/60 transition cursor-pointer"
              title="Renew JWT Session Token (1 Day)"
            >
              <KeyRound className={`h-3.5 w-3.5 ${isRefreshingToken ? 'animate-pulse' : ''}`} />
              <span className="hidden sm:inline">Renew Token</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        {feedback && (
          <div
            className={`mb-6 flex items-center justify-between rounded-xl p-4 text-sm font-medium shadow-xs ${feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
              : 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900'
              }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-xs underline opacity-70 hover:opacity-100 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-6">
          <div
            onClick={() => setActiveTab('messages')}
            className={`cursor-pointer rounded-2xl border p-4 transition ${activeTab === 'messages'
              ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-500/50 dark:bg-indigo-950/20'
              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50'
              }`}
          >
            <div className="flex items-center justify-between">
              <Mail className="h-5 w-5 text-indigo-500" />
              {unreadMessagesCount > 0 && (
                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  {unreadMessagesCount} new
                </span>
              )}
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{messages.length}</div>
              <div className="text-xs text-zinc-500 font-medium">Messages</div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('projects')}
            className={`cursor-pointer rounded-2xl border p-4 transition ${activeTab === 'projects'
              ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-500/50 dark:bg-indigo-950/20'
              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50'
              }`}
          >
            <FolderGit2 className="h-5 w-5 text-emerald-500" />
            <div className="mt-3">
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-xs text-zinc-500 font-medium">Projects</div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('skills')}
            className={`cursor-pointer rounded-2xl border p-4 transition ${activeTab === 'skills'
              ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-500/50 dark:bg-indigo-950/20'
              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50'
              }`}
          >
            <Layers className="h-5 w-5 text-amber-500" />
            <div className="mt-3">
              <div className="text-2xl font-bold">{skills.length}</div>
              <div className="text-xs text-zinc-500 font-medium">Skills</div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('experiences')}
            className={`cursor-pointer rounded-2xl border p-4 transition ${activeTab === 'experiences'
              ? 'border-indigo-500 bg-indigo-50/50 dark:border-indigo-500/50 dark:bg-indigo-950/20'
              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50'
              }`}
          >
            <Briefcase className="h-5 w-5 text-fuchsia-500" />
            <div className="mt-3">
              <div className="text-2xl font-bold">{experiences.length}</div>
              <div className="text-xs text-zinc-500 font-medium">Experiences</div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('certificates')}
            className={`cursor-pointer rounded-2xl border p-4 transition ${activeTab === 'certificates'
              ? 'border-amber-500 bg-amber-50/50 dark:border-amber-500/50 dark:bg-amber-950/20'
              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50'
              }`}
          >
            <Award className="h-5 w-5 text-amber-500" />
            <div className="mt-3">
              <div className="text-2xl font-bold">{certificates.length}</div>
              <div className="text-xs text-zinc-500 font-medium">Certificates</div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('analytics')}
            className={`cursor-pointer rounded-2xl border p-4 transition ${activeTab === 'analytics'
              ? 'border-sky-500 bg-sky-50/50 dark:border-sky-500/50 dark:bg-sky-950/20'
              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50'
              }`}
          >
            <div className="flex items-center justify-between">
              <Activity className="h-5 w-5 text-sky-500" />
              {analyticsData && analyticsData.viewsToday > 0 && (
                <span className="rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  +{analyticsData.viewsToday} today
                </span>
              )}
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{analyticsData?.totalViews ?? 0}</div>
              <div className="text-xs text-zinc-500 font-medium">Site Views</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === 'messages'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
              }`}
          >
            <Mail className="h-4 w-4" />
            Messages ({messages.length})
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === 'projects'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
              }`}
          >
            <FolderGit2 className="h-4 w-4" />
            Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === 'skills'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
              }`}
          >
            <Layers className="h-4 w-4" />
            Skills ({skills.length})
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === 'experiences'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
              }`}
          >
            <Briefcase className="h-4 w-4" />
            Experience ({experiences.length})
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === 'certificates'
              ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-white'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
              }`}
          >
            <Award className="h-4 w-4" />
            Certificates ({certificates.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === 'analytics'
              ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-white'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
              }`}
          >
            <Activity className="h-4 w-4" />
            Analytics ({analyticsData?.totalViews ?? 0})
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === 'security'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800'
              }`}
          >
            <Shield className="h-4 w-4" />
            Security & Credentials
          </button>
        </div>
        {activeTab === 'messages' && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold">Inbox Messages</h2>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search sender, email or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-100"
                />
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
                <Inbox className="mx-auto h-10 w-10 text-zinc-400" />
                <p className="mt-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Inbox is empty. No messages yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages
                  .filter((m) => {
                    const q = searchQuery.toLowerCase();
                    return (
                      m.name.toLowerCase().includes(q) ||
                      m.email.toLowerCase().includes(q) ||
                      (m.subject && m.subject.toLowerCase().includes(q)) ||
                      m.message.toLowerCase().includes(q)
                    );
                  })
                  .map((msg) => {
                    const msgId = msg.id || msg._id || '';
                    const isUnread = !msg.isRead && !msg.read;
                    return (
                      <div
                        key={msgId}
                        className={`rounded-2xl border p-5 transition-all ${!isUnread
                          ? 'border-zinc-200 bg-white dark:border-zinc-850 dark:bg-zinc-900/40'
                          : 'border-indigo-300 bg-indigo-50/40 dark:border-indigo-900/60 dark:bg-indigo-950/20'
                          }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                              {msg.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-sm">{msg.name}</h3>
                                {isUnread && (
                                  <span className="rounded-md bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                    Unread
                                  </span>
                                )}
                              </div>
                              <a
                                href={`mailto:${msg.email}`}
                                className="text-xs text-indigo-600 hover:underline dark:text-indigo-400"
                              >
                                {msg.email}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-zinc-400">
                              {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                            </span>
                            <button
                              onClick={() => handleToggleRead(msg)}
                              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                              title={isUnread ? 'Mark as Read' : 'Mark as Unread'}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(msgId)}
                              className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {msg.subject && (
                          <div className="mt-3 font-semibold text-xs text-zinc-700 dark:text-zinc-300">
                            Subject: {msg.subject}
                          </div>
                        )}

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {msg.message}
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
        {activeTab === 'projects' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Projects Portfolio</h2>
                <p className="text-xs text-zinc-500">Add, edit, or remove showcase projects</p>
              </div>
              <button
                onClick={() => openProjectModal()}
                className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add New Project
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj) => {
                const projId = proj.id || proj._id || '';
                return (
                  <div
                    key={projId}
                    className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            {proj.category}
                          </span>
                          {proj.featured && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                              <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleFeatured(proj)}
                            className={`rounded-lg p-1.5 transition cursor-pointer ${proj.featured
                                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                                : 'text-zinc-400 hover:bg-zinc-100 hover:text-amber-500 dark:hover:bg-zinc-800'
                              }`}
                            title={proj.featured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            <Star className={`h-4 w-4 ${proj.featured ? 'fill-amber-500' : ''}`} />
                          </button>
                          <button
                            onClick={() => openProjectModal(proj)}
                            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(projId)}
                            className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {proj.image && (
                        <div className="mt-3 relative h-32 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}

                      <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {proj.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-300">
                        {proj.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1">
                        {proj.tech?.map((t, idx) => (
                          <span
                            key={`${t}-${idx}`}
                            className="rounded-md bg-zinc-100/70 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Repo
                        </a>
                      )}
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === 'skills' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Skills & Technologies</h2>
                <p className="text-xs text-zinc-500">Manage technical skillset shown on homepage</p>
              </div>
              <button
                onClick={() => openSkillModal()}
                className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add New Skill
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {skills.map((sk) => {
                const skId = sk.id || sk._id || '';
                return (
                  <div
                    key={skId}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <div>
                      <div className="font-bold text-sm">{sk.name}</div>
                      <div className="text-[11px] capitalize text-zinc-400">{sk.category}</div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openSkillModal(sk)}
                        className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skId)}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === 'experiences' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Work Experience</h2>
                <p className="text-xs text-zinc-500">Manage timeline history and responsibilities</p>
              </div>
              <button
                onClick={() => openExpModal()}
                className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => {
                const expId = exp.id || exp._id || '';
                return (
                  <div
                    key={expId}
                    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold">{exp.role}</h3>
                        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                          {exp.company}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          {exp.duration}
                        </span>
                        <button
                          onClick={() => openExpModal(exp)}
                          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExp(expId)}
                          className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {exp.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === 'certificates' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Certificates</h2>
                <p className="text-xs text-zinc-500">Add certificate image URL and title</p>
              </div>
              <button
                onClick={() => openCertModal()}
                className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Certificate
              </button>
            </div>

            {certificates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
                <Award className="mx-auto h-8 w-8 text-zinc-400" />
                <p className="mt-3 text-sm text-zinc-500">No certificates yet. Add your first one!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => {
                  const certId = cert.id || cert._id || '';
                  return (
                    <div
                      key={certId}
                      className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                      <a
                        href={cert.image}
                        target="_blank"
                        rel="noreferrer"
                        className="group/img relative block h-40 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden cursor-pointer"
                        title="Click to view full image in new tab"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white z-10">
                          <Award className="h-2.5 w-2.5" />
                          Certificate
                        </span>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 px-2.5 py-1 text-[11px] font-semibold shadow-sm">
                            <ExternalLink className="h-3 w-3" />
                            View Full
                          </span>
                        </div>
                      </a>

                      <div className="p-4">
                        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                          {cert.title}
                        </h3>
                        {cert.createdAt && (
                          <p className="mt-1 text-[11px] text-zinc-400">
                            {new Date(cert.createdAt).toLocaleDateString('en-US', {
                              month: 'short', year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 px-4 py-3">
                        <a
                          href={cert.image}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View Image
                        </a>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openCertModal(cert)}
                            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                            title="Edit Certificate"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCert(certId)}
                            className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 cursor-pointer"
                            title="Delete Certificate"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {activeTab === 'security' && (
          <div className="mt-6 max-w-xl">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Update Admin Password</h3>
                  <p className="text-xs text-zinc-500">Protect your dashboard access</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-zinc-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-zinc-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-zinc-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-100"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  Save New Password
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Visitor Analytics & Traffic</h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Tracking
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  Insights on visitor devices, geographic locations, and total views across your portfolio.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchAnalytics}
                  disabled={isAnalyticsLoading}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition cursor-pointer"
                  title="Refresh visitor analytics"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isAnalyticsLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={handleClearAnalytics}
                  className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/80 transition cursor-pointer"
                  title="Clear all recorded analytics data"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Reset Analytics
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-5 dark:border-sky-900/40 dark:bg-sky-950/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                    Unique IP Visitors
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                    {analyticsData?.totalViews ?? 0}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Based on IP address (same IP views don&apos;t increase)
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Unique Visitors
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                    {analyticsData?.uniqueVisitors ?? 0}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Distinct IP visitor sessions
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-5 dark:border-violet-900/40 dark:bg-violet-950/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
                    Active Today
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                    {analyticsData?.viewsToday ?? 0}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Active IPs in the last 24 hours
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Primary Device
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                    <Smartphone className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                    {analyticsData?.devices && analyticsData.devices.length > 0
                      ? analyticsData.devices[0].name
                      : 'N/A'}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {analyticsData?.devices && analyticsData.devices.length > 0
                      ? `${analyticsData.devices[0].percentage}% of visitor traffic`
                      : 'Awaiting visitor data'}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        Devices Distribution
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Types of devices used to access your portfolio
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  {['Mobile', 'Desktop', 'Tablet'].map((devName) => {
                    const devItem = analyticsData?.devices?.find(
                      (d) => d.name.toLowerCase() === devName.toLowerCase()
                    );
                    const count = devItem ? devItem.count : 0;
                    const pct = devItem ? devItem.percentage : 0;

                    const IconComponent =
                      devName === 'Mobile'
                        ? Smartphone
                        : devName === 'Desktop'
                          ? Monitor
                          : TabletIcon;

                    const colorClass =
                      devName === 'Mobile'
                        ? 'bg-sky-500'
                        : devName === 'Desktop'
                          ? 'bg-emerald-500'
                          : 'bg-purple-500';

                    return (
                      <div key={devName} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200">
                            <IconComponent className="h-4 w-4 text-zinc-500" />
                            {devName}
                          </span>
                          <span className="font-bold text-zinc-600 dark:text-zinc-300">
                            {count} views ({pct}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Operating Systems & Browsers
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {analyticsData?.os?.map((osItem) => (
                      <span
                        key={osItem.name}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                      >
                        <Laptop className="h-3 w-3 text-zinc-400" />
                        {osItem.name}: <strong className="font-bold">{osItem.count}</strong>
                      </span>
                    ))}
                    {analyticsData?.browsers?.map((bItem) => (
                      <span
                        key={bItem.name}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                      >
                        <Globe className="h-3 w-3 text-zinc-400" />
                        {bItem.name}: <strong className="font-bold">{bItem.count}</strong>
                      </span>
                    ))}
                    {(!analyticsData?.os || analyticsData.os.length === 0) && (
                      <p className="text-xs text-zinc-400 italic">No OS data recorded yet</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        Visitor Locations
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Geographic origin of site visitors (Cities & Countries)
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {analyticsData?.locations?.length ?? 0} Locations
                  </span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {analyticsData?.locations && analyticsData.locations.length > 0 ? (
                    analyticsData.locations.map((loc, idx) => (
                      <div
                        key={`${loc.country}-${loc.city}-${idx}`}
                        className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-3 transition dark:border-zinc-800/60 dark:bg-zinc-800/30"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                              {loc.city !== 'Unknown' ? `${loc.city}, ` : ''}
                              {loc.country}
                            </span>
                            {loc.countryCode && (
                              <span className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-[9px] font-mono font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300 uppercase">
                                {loc.countryCode}
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">
                            {loc.count} {loc.count === 1 ? 'view' : 'views'} ({loc.percentage}%)
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${Math.max(loc.percentage, 4)}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <Globe className="mx-auto h-8 w-8 text-zinc-400 opacity-60" />
                      <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        No geographic data recorded yet.
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-400">
                        Visits from visitors will automatically log their country and city here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center justify-between border-b border-zinc-100 p-6 pb-4 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Recent Visitor Sessions
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Live audit of the latest 25 page visits with device & location details
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-zinc-500">
                  {analyticsData?.recentVisits?.length ?? 0} Visits Logged
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-zinc-100 bg-zinc-50 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-400">
                    <tr>
                      <th className="px-6 py-3">IP Address</th>
                      <th className="px-6 py-3">Device</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Browser / OS</th>
                      <th className="px-6 py-3">Page Visited</th>
                      <th className="px-6 py-3">Resolution</th>
                      <th className="px-6 py-3 text-right">Latest Visit (Time & Date)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {analyticsData?.recentVisits && analyticsData.recentVisits.length > 0 ? (
                      analyticsData.recentVisits.map((visit, index) => {
                        const DeviceIcon =
                          visit.device === 'Mobile'
                            ? Smartphone
                            : visit.device === 'Desktop'
                              ? Monitor
                              : TabletIcon;

                        return (
                          <tr
                            key={visit.id || visit._id || index}
                            className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors"
                          >
                            <td className="px-6 py-3.5 whitespace-nowrap">
                              <span className="font-mono font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                                {visit.ip || '127.0.0.1'}
                              </span>
                            </td>
                            <td className="px-6 py-3.5 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                <DeviceIcon className="h-3.5 w-3.5 text-zinc-500" />
                                {visit.device}
                                {visit.visitCount && visit.visitCount > 1 ? (
                                  <span className="ml-1 rounded bg-zinc-100 px-1 py-0.5 text-[10px] font-normal text-zinc-500 dark:bg-zinc-700 dark:text-zinc-300" title={`This IP visited ${visit.visitCount} times without increasing overall count`}>
                                    {visit.visitCount}x
                                  </span>
                                ) : null}
                              </span>
                            </td>
                            <td className="px-6 py-3.5 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                                <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                                <span>
                                  {visit.city !== 'Unknown' ? `${visit.city}, ` : ''}
                                  {visit.country}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-3.5 whitespace-nowrap text-zinc-600 dark:text-zinc-300">
                              <span>
                                {visit.browser} on {visit.os}
                              </span>
                            </td>
                            <td className="px-6 py-3.5 whitespace-nowrap font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                              {visit.path || '/'}
                            </td>
                            <td className="px-6 py-3.5 whitespace-nowrap text-zinc-500 font-mono text-[11px]">
                              {visit.screenResolution || 'Auto'}
                            </td>
                            <td className="px-6 py-3.5 whitespace-nowrap text-right text-zinc-500">
                              {visit.lastVisitedAt || visit.createdAt
                                ? new Date(visit.lastVisitedAt || visit.createdAt).toLocaleString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                })
                                : 'Just now'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-zinc-400 italic">
                          No visits logged yet. Visit your portfolio homepage to see live activity here!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <h3 className="text-base font-bold">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-4 space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. AI Workflow Platform"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Category</label>
                  <input
                    type="text"
                    required
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="Full Stack / Frontend / Backend"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Technologies (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={projectForm.tech}
                    onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Project Image URL (Cloudinary / Direct Link)
                </label>
                <input
                  type="url"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="https://res.cloudinary.com/... or https://..."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
                {projectForm.image && (
                  <div className="mt-2 relative h-28 w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={projectForm.image}
                      alt="Project Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Brief description of architecture and features..."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">GitHub Repo URL</label>
                <input
                  type="url"
                  value={projectForm.github}
                  onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Live Demo URL</label>
                <input
                  type="url"
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  placeholder="https://my-app.vercel.app"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    <Star className={`h-4 w-4 ${projectForm.featured ? 'fill-amber-500 text-amber-500' : 'text-zinc-400'}`} />
                    Mark as Featured
                  </div>
                  <p className="mt-0.5 text-[11px] text-zinc-500">Featured projects appear on the homepage</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProjectForm({ ...projectForm, featured: !projectForm.featured })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${projectForm.featured ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${projectForm.featured ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <h3 className="text-base font-bold">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button
                onClick={() => setIsSkillModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Skill Name</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. Next.js, FastAPI, PostgreSQL"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) =>
                    setSkillForm({
                      ...skillForm,
                      category: e.target.value as 'frontend' | 'backend' | 'database' | 'other' | 'testing',
                    })
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="database">Database Systems</option>
                  <option value="testing">Testing &amp; Automation</option>
                  <option value="other">Other Tools &amp; DevOps</option>
                </select>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 cursor-pointer"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <h3 className="text-base font-bold">
                {editingExp ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button
                onClick={() => setIsExpModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="mt-4 space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Role / Job Title</label>
                <input
                  type="text"
                  required
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  placeholder="e.g. Senior Full Stack Developer"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Company</label>
                <input
                  type="text"
                  required
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  placeholder="e.g. Freelance / TechCorp"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Duration</label>
                <input
                  type="text"
                  required
                  value={expForm.duration}
                  onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                  placeholder="e.g. 2023 - Present"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Responsibilities & Impact</label>
                <textarea
                  rows={3}
                  required
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  placeholder="Describe your achievements, architecture contributions..."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 cursor-pointer"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <h3 className="text-base font-bold">
                {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
              </h3>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  placeholder="e.g. React - The Complete Guide (Udemy)"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Certificate Image URL (Cloudinary / Direct Link)
                </label>
                <input
                  type="url"
                  required
                  value={certForm.image}
                  onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                  placeholder="https://res.cloudinary.com/... or https://..."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
                />
                {certForm.image && (
                  <div className="mt-2 relative h-32 w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={certForm.image}
                      alt="Certificate Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <p className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">
                      Preview
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 cursor-pointer"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;