/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Globe, BookOpen, GraduationCap, Users } from 'lucide-react';
import KassalaLogo from './KassalaLogo';

interface NavbarProps {
  currentView: 'public' | 'committee';
  setView: (view: 'public' | 'committee') => void;
  pendingApprovalsCount: number;
}

export default function Navbar({ currentView, setView, pendingApprovalsCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur-md shadow-xs" id="portal-header">
      {/* Top Banner with Premium Medical Emerald Theme */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white text-[11px] py-2 px-4 flex flex-wrap justify-between items-center" id="portal-top-bar">
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="font-extrabold tracking-wide bg-emerald-950/50 px-2 py-0.5 rounded text-[10px]">البوابة الإلكترونية</span>
          <span className="text-white/30 font-light">|</span>
          <span className="opacity-85">وزارة التعليم العالي والبحث العلمي</span>
          <span className="text-white/30 font-light">|</span>
          <span className="font-bold text-emerald-100">جامعة كسلا - كلية الطب والعلوم الصحية</span>
        </div>
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse text-white/90">
            <span className="hover:text-emerald-200 transition-colors cursor-pointer font-medium">المجلات العلمية</span>
            <span className="text-white/30">•</span>
            <span className="hover:text-emerald-200 transition-colors cursor-pointer font-medium">البريد الجامعي الموحد</span>
            <span className="text-white/30">•</span>
            <span className="hover:text-emerald-200 transition-colors cursor-pointer font-medium">نظام التسجيل الإلكتروني</span>
          </div>
          <div className="text-emerald-100 bg-white/10 px-3 py-0.5 rounded-full text-[10px] font-mono border border-white/5 font-semibold">
            portal.med@kassala.edu.sd
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4" id="portal-main-nav">
        {/* Logo and Brand Identity inspired by medical shield styling */}
        <div className="flex items-center space-x-4 space-x-reverse cursor-pointer group" onClick={() => setView('public')}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-100 p-0.5 shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:shadow-emerald-100/50 group-hover:shadow-md">
            <KassalaLogo size={42} />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
              <span>كلية الطب والعلوم الصحية</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-full font-black">البوابة الموحدة</span>
            </h1>
            <p className="text-xs font-bold text-slate-400">جامعة كسلا | Kassala University</p>
          </div>
        </div>

        {/* View Switcher: Public Website vs. Committee Dashboard */}
        <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50 shadow-inner" id="portal-view-switcher">
          <button
            id="view-public-btn"
            onClick={() => setView('public')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-350 cursor-pointer ${
              currentView === 'public'
                ? 'bg-white text-emerald-900 shadow-md border border-slate-200/30 font-black'
                : 'text-slate-500 hover:text-emerald-800 hover:bg-white/40'
            }`}
          >
            <Globe className="h-4 w-4 shrink-0" />
            <span>البوابة العامة للكلية</span>
          </button>
          <button
            id="view-committee-btn"
            onClick={() => setView('committee')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-350 relative cursor-pointer ${
              currentView === 'committee'
                ? 'bg-white text-emerald-900 shadow-md border border-slate-200/30 font-black'
                : 'text-slate-500 hover:text-emerald-800 hover:bg-white/40'
            }`}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>منصة لجنة التنسيق المشتركة</span>
            {pendingApprovalsCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-black text-white border-2 border-white shadow-sm animate-pulse">
                {pendingApprovalsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
