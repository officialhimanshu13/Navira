import React, { useState } from 'react';
import { MarketplaceProject, ProjectMilestone } from '../../types/marketplace';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Store, 
  Plus, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck,
  ChevronRight,
  Edit2,
  Trash2,
  X,
  Save,
  Check,
  AlertTriangle
} from 'lucide-react';

interface ProjectsViewProps {
  projects: MarketplaceProject[];
  onOpenChat: (projectId: string) => void;
  onNavigateToDevelopers: () => void;
  onUpdateProjects: (updated: MarketplaceProject[]) => void;
  isAdmin?: boolean;
  onPromptLogin?: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onOpenChat,
  onNavigateToDevelopers,
  onUpdateProjects,
  isAdmin = false,
  onPromptLogin,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDueDate, setNewMilestoneDueDate] = useState('');

  // Project Creation Form State
  const [createForm, setCreateForm] = useState({
    title: '',
    businessName: '',
    businessCategory: 'Restaurants, Cafes & Bakeries',
    businessCity: 'Chandigarh',
    businessLocality: 'Sector 35',
    clientName: '',
    developerName: 'Arjun Mehta',
    budget: '₹20,000',
    deadline: '15 Days',
    status: 'Planning' as MarketplaceProject['status'],
  });

  // Project Edit Form State
  const [editForm, setEditForm] = useState<{
    title: string;
    clientName: string;
    budget: string;
    deadline: string;
    status: MarketplaceProject['status'];
  }>({
    title: '',
    clientName: '',
    budget: '',
    deadline: '',
    status: 'Planning',
  });

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Milestone completion toggle handler
  const handleToggleMilestone = (milestoneId: string) => {
    if (!selectedProject) return;

    const updatedMilestones = selectedProject.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const progressPercentage = Math.round((completedCount / updatedMilestones.length) * 100);

    const updatedProject: MarketplaceProject = {
      ...selectedProject,
      milestones: updatedMilestones,
      progressPercentage,
      lastUpdate: 'Just now'
    };

    const updatedList = projects.map((p) =>
      p.id === selectedProject.id ? updatedProject : p
    );
    onUpdateProjects(updatedList);
  };

  // Add new milestone handler
  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim() || !selectedProject) return;

    const newM: ProjectMilestone = {
      id: `m-${Date.now()}`,
      title: newMilestoneTitle.trim(),
      completed: false,
      dueDate: newMilestoneDueDate.trim() || 'Next Sprint',
    };

    const updatedMilestones = [...selectedProject.milestones, newM];
    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const progressPercentage = Math.round((completedCount / updatedMilestones.length) * 100);

    const updatedProject: MarketplaceProject = {
      ...selectedProject,
      milestones: updatedMilestones,
      progressPercentage,
      lastUpdate: 'Just now'
    };

    onUpdateProjects(projects.map((p) => (p.id === selectedProject.id ? updatedProject : p)));
    setNewMilestoneTitle('');
    setNewMilestoneDueDate('');
  };

  // Delete project handler
  const handleDeleteProject = (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const updatedList = projects.filter((p) => p.id !== projectId);
    onUpdateProjects(updatedList);
    if (selectedProjectId === projectId && updatedList.length > 0) {
      setSelectedProjectId(updatedList[0].id);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = () => {
    if (!selectedProject) return;
    setEditForm({
      title: selectedProject.title,
      clientName: selectedProject.clientName,
      budget: selectedProject.budget,
      deadline: selectedProject.deadline,
      status: selectedProject.status,
    });
    setIsEditModalOpen(true);
  };

  // Save Project Edits
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const updatedProject: MarketplaceProject = {
      ...selectedProject,
      ...editForm,
      lastUpdate: 'Just now'
    };

    onUpdateProjects(projects.map((p) => (p.id === selectedProject.id ? updatedProject : p)));
    setIsEditModalOpen(false);
  };

  // Create New Project Handler
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.title.trim() || !createForm.clientName.trim()) return;

    const newProject: MarketplaceProject = {
      id: `proj-${Date.now()}`,
      title: createForm.title.trim(),
      businessName: createForm.businessName.trim() || createForm.title.trim(),
      businessCategory: createForm.businessCategory,
      businessCity: createForm.businessCity,
      businessLocality: createForm.businessLocality,
      clientName: createForm.clientName.trim(),
      developerId: 'dev-1',
      developerName: createForm.developerName,
      developerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      status: createForm.status,
      progressPercentage: 20,
      budget: createForm.budget,
      deadline: createForm.deadline,
      lastUpdate: 'Just created',
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Project Scope & Requirements Signoff', completed: true, dueDate: 'Day 2' },
        { id: `m-${Date.now()}-2`, title: 'Figma UI Mockup & Mobile Layout Review', completed: false, dueDate: 'Day 5' },
        { id: `m-${Date.now()}-3`, title: 'Frontend Coding & Responsive Optimization', completed: false, dueDate: 'Day 10' },
        { id: `m-${Date.now()}-4`, title: 'Domain Configuration & Live Launch', completed: false, dueDate: 'Day 15' },
      ]
    };

    const updated = [newProject, ...projects];
    onUpdateProjects(updated);
    setSelectedProjectId(newProject.id);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19BDF0]/10 border border-[#19BDF0]/20 text-[#19BDF0] text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Milestone Project Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Active Website Development Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track milestones, deliverables, design reviews, and launch schedules with full transparency.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#19BDF0] to-[#10B981] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#19BDF0]/20 self-start sm:self-auto hover:from-[#14a7d4] hover:to-[#059669] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Main Grid: Left Projects List (5 cols), Right Milestone Detail (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Project Selector Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Your Projects ({projects.length})
            </h3>
            <span className="text-[11px] text-slate-500">Persisted locally</span>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#09152A] border-[#19BDF0] shadow-xl shadow-black/40'
                      : 'bg-[#09152A]/60 border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] font-semibold text-[#19BDF0] bg-[#19BDF0]/10 px-2 py-0.5 rounded-md">
                      {proj.businessCategory}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {proj.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{proj.title}</h4>
                  
                  <div className="text-xs text-slate-400 flex items-center gap-2 mb-3">
                    <Store className="w-3.5 h-3.5 text-slate-500" />
                    <span>{proj.businessName} ({proj.businessCity})</span>
                  </div>

                  {/* Progress Indicator */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Milestones: {proj.milestones.filter((m) => m.completed).length}/{proj.milestones.length} Completed</span>
                      <span className="font-semibold text-white">{proj.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#19BDF0] to-[#10B981]"
                        style={{ width: `${proj.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Project Milestone Detailed Roadmap */}
        {selectedProject ? (
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#09152A]/90 border border-white/[0.08] shadow-2xl space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#19BDF0] bg-[#19BDF0]/10 px-2.5 py-0.5 rounded-full border border-[#19BDF0]/20">
                      {selectedProject.businessCategory}
                    </span>
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {selectedProject.status}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                    <span>Client: <strong className="text-white font-medium">{selectedProject.clientName}</strong></span>
                    <span>•</span>
                    <span>Budget: <strong className="text-emerald-400 font-medium">{selectedProject.budget}</strong></span>
                    <span>•</span>
                    <span>Target: <strong className="text-white font-medium">{selectedProject.deadline}</strong></span>
                  </div>
                </div>

                {/* Edit & Chat Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleOpenEdit}
                    className="p-2.5 rounded-xl bg-[#060F1E] hover:bg-[#0F2140] border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(selectedProject.id)}
                    className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold transition-all"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenChat(selectedProject.id)}
                    className="px-3.5 py-2.5 rounded-xl bg-[#060F1E] hover:bg-[#0F2140] border border-white/10 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-[#19BDF0]" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>

              {/* Developer Assigned Card */}
              <div className="p-4 rounded-2xl bg-[#060F1E] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProject.developerAvatar}
                    alt={selectedProject.developerName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#19BDF0]"
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Assigned Developer</span>
                    <h4 className="text-sm font-bold text-white">{selectedProject.developerName}</h4>
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Milestone Escrow</span>
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400">
                  <span>Last update:</span>
                  <div className="text-white font-medium">{selectedProject.lastUpdate}</div>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Milestones Checklist ({selectedProject.milestones.filter(m => m.completed).length}/{selectedProject.milestones.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">Click circle to mark completed</span>
                </div>

                <div className="space-y-3">
                  {selectedProject.milestones.map((milestone, idx) => (
                    <div
                      key={milestone.id}
                      onClick={() => handleToggleMilestone(milestone.id)}
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        milestone.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-white'
                          : 'bg-[#060F1E]/70 border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            milestone.completed
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {milestone.completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div>
                          <h5 className={`text-xs font-bold ${milestone.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                            {milestone.title}
                          </h5>
                          <span className="text-[11px] text-slate-400">Due: {milestone.dueDate}</span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          milestone.completed
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        {milestone.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick Add Milestone Form */}
                <form onSubmit={handleAddMilestone} className="p-3 rounded-xl bg-[#060F1E] border border-white/5 flex gap-2">
                  <input
                    type="text"
                    required
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    placeholder="Add new project milestone..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                  />
                  <input
                    type="text"
                    value={newMilestoneDueDate}
                    onChange={(e) => setNewMilestoneDueDate(e.target.value)}
                    placeholder="Due (e.g. Nov 15)"
                    className="w-28 px-2.5 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-[#19BDF0] text-slate-950 font-bold text-xs hover:bg-[#14a7d4]"
                  >
                    Add
                  </button>
                </form>
              </div>

            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 p-12 text-center rounded-3xl bg-[#09152A] border border-white/10 text-slate-400">
            No projects available. Click "Create New Project" to get started.
          </div>
        )}

      </div>

      {/* CREATE PROJECT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#09152A] border border-[#19BDF0]/30 shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">Create New Project</h3>

            <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  placeholder="e.g. Modern Web Presence & Table Booking"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Business Name</label>
                  <input
                    type="text"
                    value={createForm.businessName}
                    onChange={(e) => setCreateForm({ ...createForm, businessName: e.target.value })}
                    placeholder="e.g. The Coffee House"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={createForm.clientName}
                    onChange={(e) => setCreateForm({ ...createForm, clientName: e.target.value })}
                    placeholder="e.g. Sunil Duggal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City</label>
                  <select
                    value={createForm.businessCity}
                    onChange={(e) => setCreateForm({ ...createForm, businessCity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  >
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Mohali">Mohali</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Locality</label>
                  <input
                    type="text"
                    value={createForm.businessLocality}
                    onChange={(e) => setCreateForm({ ...createForm, businessLocality: e.target.value })}
                    placeholder="e.g. Sector 17"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Budget</label>
                  <input
                    type="text"
                    value={createForm.budget}
                    onChange={(e) => setCreateForm({ ...createForm, budget: e.target.value })}
                    placeholder="e.g. ₹22,000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Deadline</label>
                  <input
                    type="text"
                    value={createForm.deadline}
                    onChange={(e) => setCreateForm({ ...createForm, deadline: e.target.value })}
                    placeholder="e.g. Nov 20, 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] shadow-lg shadow-[#19BDF0]/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Plus className="w-4 h-4" />
                <span>Create & Initialize Milestones</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#09152A] border border-[#19BDF0]/30 shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">Edit Project Details</h3>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.clientName}
                    onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Project Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Design & Wireframes">Design & Wireframes</option>
                    <option value="Development">Development</option>
                    <option value="Client Review">Client Review</option>
                    <option value="Live / Delivered">Live / Delivered</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Budget</label>
                  <input
                    type="text"
                    value={editForm.budget}
                    onChange={(e) => setEditForm({ ...editForm, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Deadline</label>
                  <input
                    type="text"
                    value={editForm.deadline}
                    onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] shadow-lg shadow-[#19BDF0]/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Save className="w-4 h-4" />
                <span>Save Project Changes</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
