/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PublicPortal from './components/PublicPortal';
import CommitteeConsole from './components/CommitteeConsole';

// Import types and initial data
import { 
  initialDepartments, 
  initialNews, 
  initialPodcastEpisodes, 
  initialITRequests, 
  initialCommitteeTasks, 
  initialMeetings, 
  initialMedicalConvoys 
} from './data/initialData';
import { Department, NewsItem, PodcastEpisode, ITRequest, CommitteeTask, BiannualMeeting, MedicalConvoy } from './types';

export default function App() {
  const [currentView, setView] = useState<'public' | 'committee'>('public');

  // Shared state of the application
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(initialPodcastEpisodes);
  const [convoys, setConvoys] = useState<MedicalConvoy[]>(initialMedicalConvoys);
  const [itRequests, setItRequests] = useState<ITRequest[]>(initialITRequests);
  const [committeeTasks, setCommitteeTasks] = useState<CommitteeTask[]>(initialCommitteeTasks);
  const [meetings, setMeetings] = useState<BiannualMeeting[]>(initialMeetings);

  // Calculate pending news items that require Level 1 (Dean) approval
  const pendingApprovalsCount = news.filter((item) => item.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9]" id="main-app-wrapper" dir="rtl">
      {/* Shared Site Header */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        pendingApprovalsCount={pendingApprovalsCount} 
      />

      {/* Screen Routing */}
      <div className="flex-grow transition-opacity duration-300" id="portal-content-area">
        {currentView === 'public' ? (
          <PublicPortal 
            departments={departments}
            news={news}
            podcasts={podcasts}
            convoys={convoys}
          />
        ) : (
          <CommitteeConsole 
            departments={departments}
            setDepartments={setDepartments}
            news={news}
            setNews={setNews}
            podcasts={podcasts}
            setPodcasts={setPodcasts}
            convoys={convoys}
            setConvoys={setConvoys}
            itRequests={itRequests}
            setItRequests={setItRequests}
            committeeTasks={committeeTasks}
            setCommitteeTasks={setCommitteeTasks}
            meetings={meetings}
            setMeetings={setMeetings}
          />
        )}
      </div>
    </div>
  );
}
