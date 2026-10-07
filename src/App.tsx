import React, { useEffect, useState } from 'react';
import { MAIN_TRIP } from './data/mockData';
import { Trip } from './types/trip';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { TripDetailScreen } from './components/screens/TripDetailScreen';
import { PiggybankScreen } from './components/screens/PiggybankScreen';
import { SquadScreen } from './components/screens/SquadScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { LandingScreen } from './components/screens/LandingScreen';
import { EnterAccountScreen } from './components/screens/EnterAccountScreen';
import { CreateAccountScreen } from './components/screens/CreateAccountScreen';
import { CheckEmailScreen } from './components/screens/CheckEmailScreen';
import { LoadingTripScreen } from './components/screens/LoadingTripScreen';
import { TravelerTypeScreen, TravelerTypeId } from './components/screens/TravelerTypeScreen';
import {
  TravelPrioritiesScreen,
  TravelPriorityId,
  PriorityScore,
  PriorityScores,
} from './components/screens/TravelPrioritiesScreen';
import { ContributeModal } from './components/modals/ContributeModal';
import { VoteModal } from './components/modals/VoteModal';
import { CreateTripModal } from './components/modals/CreateTripModal';
import { InviteModal } from './components/modals/InviteModal';
import { EMPTY_FILTERS, FiltersScreen, SearchFilters } from './components/screens/FiltersScreen';
import { OffersScreen } from './components/screens/OffersScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { FeaturedTripScreen } from './components/screens/FeaturedTripScreen';
import { getFeaturedTrip } from './data/featuredTrips';
import { applyCreatedAccount, SignInMethod } from './components/signIn';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'tipo-viajero' | 'importancia' | 'entrar' | 'crear-cuenta' | 'revisar-correo' | 'cargando' | 'inicio' | 'buscar' | 'filtros' | 'detalle-viaje' | 'viaje-destacado' | 'ofertas' | 'favoritos' | 'alcancia' | 'parche' | 'perfil' | 'landing'
  >('tipo-viajero');
  const [featuredTripId, setFeaturedTripId] = useState<string | null>(null);
  const [trip, setTrip] = useState<Trip>(MAIN_TRIP);
  const [history, setHistory] = useState<string[]>(['tipo-viajero']);
  const [travelerTypes, setTravelerTypes] = useState<TravelerTypeId[]>([]);
  const [priorities, setPriorities] = useState<PriorityScores>({});
  const [account, setAccount] = useState<SignInMethod | null>(null);
  const [signupEmail, setSignupEmail] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(EMPTY_FILTERS);
  const [likesByAccount, setLikesByAccount] = useState<Record<string, Record<string, boolean>>>({});
  const likesKey = account ?? 'guest';
  const likedCards = likesByAccount[likesKey] ?? {};

  const toggleLike = (id: string) => {
    setLikesByAccount((prev) => {
      const current = prev[likesKey] ?? {};
      return { ...prev, [likesKey]: { ...current, [id]: !current[id] } };
    });
  };

  // Modals state
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isVoteOpen, setIsVoteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const openFeaturedTrip = (id: string) => {
    setFeaturedTripId(id);
    navigateTo('viaje-destacado');
  };

  const navigateTo = (screen: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // current
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen as any);
    } else {
      setCurrentScreen('inicio');
    }
  };

  // Handle contribution success
  const handleContributeSuccess = (amount: number, memberId: string) => {
    setTrip((prev) => {
      const donor = prev.members.find((m) => m.id === memberId);
      const newSaved = prev.totalSaved + amount;
      const newPercentage = prev.totalGoal > 0
        ? Math.min(100, Math.round((newSaved / prev.totalGoal) * 100))
        : 0;

      const updatedMembers = prev.members.map((m) => {
        if (m.id !== memberId) return m;
        const newContrib = m.contributionAmount + amount;
        const newP = m.targetAmount > 0
          ? Math.min(100, Math.round((newContrib / m.targetAmount) * 100))
          : 0;
        return {
          ...m,
          contributionAmount: newContrib,
          percentage: newP,
          statusText: newP === 100 ? '100% Pagado' : `${newP}% Abonado`,
        };
      });

      const newTx = {
        id: `tx-${Date.now()}`,
        title: `${donor?.name ?? 'Alguien del parche'} (Aporte a la alcancía)`,
        date: 'Hace un momento',
        amount: amount,
        type: 'in' as const,
        method: 'Simulación',
      };

      return {
        ...prev,
        totalSaved: newSaved,
        progressPercentage: newPercentage,
        members: updatedMembers,
        transactions: [newTx, ...prev.transactions],
      };
    });
  };

  // Handle poll voting
  const handleVote = (optionId: string) => {
    setTrip((prev) => {
      const poll = prev.poll;
      const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0) + 1;

      const updatedOptions = poll.options.map((opt) => {
        const isTarget = opt.id === optionId;
        const newVotes = isTarget ? opt.votes + 1 : opt.votes;
        return {
          ...opt,
          votes: newVotes,
          percentage: Math.round((newVotes / totalVotes) * 100),
        };
      });

      return {
        ...prev,
        poll: {
          ...poll,
          userVotedOptionId: optionId,
          options: updatedOptions,
        },
      };
    });
  };

  // Handle adding custom poll option
  const handleAddPollOption = (title: string) => {
    setTrip((prev) => {
      const poll = prev.poll;
      const drafted = [
        ...poll.options,
        {
          id: `opt-${Date.now()}`,
          title,
          subtitle: '1 voto (Tú)',
          votes: 1,
          voters: ['Tú'],
          percentage: 0,
        },
      ];
      const totalVotes = drafted.reduce((sum, opt) => sum + opt.votes, 0);
      return {
        ...prev,
        poll: {
          ...poll,
          options: drafted.map((opt) => ({
            ...opt,
            percentage: totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100),
          })),
        },
      };
    });
  };

  // Handle creating new trip
  const handleCreateTrip = (newTripData: {
    title: string;
    squadName: string;
    dates: string;
    goal: number;
    initialMembers: number;
  }) => {
    const perPerson = Math.round(newTripData.goal / Math.max(newTripData.initialMembers, 1));
    setTrip({
      id: `trip-${Date.now()}`,
      title: newTripData.title,
      squadName: newTripData.squadName,
      dates: newTripData.dates,
      days: 0,
      daysRemaining: 0,
      status: 'En planificación',
      image: '',
      totalSaved: 0,
      totalGoal: newTripData.goal,
      progressPercentage: 0,
      estimatedPerPerson: perPerson,
      members: [
        {
          id: 'tu',
          name: 'Tú',
          role: 'Quien armó el parche',
          roleType: 'lider',
          avatar: '',
          status: 'confirmado',
          contributionAmount: 0,
          targetAmount: perPerson,
          percentage: 0,
          statusText: 'Sin aportar',
          isKeyRole: true,
        },
      ],
      poll: {
        id: `poll-${Date.now()}`,
        dayLabel: 'Por definir',
        question: '¿Qué queremos definir primero?',
        closesIn: 'Sin cierre todavía',
        options: [],
      },
      activities: {},
      expenses: [],
      transactions: [],
    });
    navigateTo('detalle-viaje');
  };

  const enterHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHistory(['inicio']);
    setCurrentScreen('inicio');
  };

  const signIn = (method: SignInMethod) => {
    setAccount(method);
    setHistory(['cargando']);
    setCurrentScreen('cargando');
  };

  useEffect(() => {
    if (currentScreen !== 'cargando') return;
    const timer = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setHistory(['inicio']);
      setCurrentScreen('inicio');
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [currentScreen]);

  const signOut = () => {
    setAccount(null);
    navigateTo('landing');
  };

  // Onboarding sits before the app chrome. Landing also hides the tab bar.
  const setPriority = (id: TravelPriorityId, score: PriorityScore) => {
    setPriorities((prev) => ({ ...prev, [id]: score }));
  };

  const isOnboarding =
    currentScreen === 'tipo-viajero' ||
    currentScreen === 'importancia' ||
    currentScreen === 'entrar' ||
    currentScreen === 'crear-cuenta' ||
    currentScreen === 'revisar-correo' ||
    currentScreen === 'cargando';
  const showBottomNav = currentScreen !== 'landing' && !isOnboarding;

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1b1c1c] flex flex-col antialiased selection:bg-[#a8e6d9] selection:text-[#00201b]">
      {!isOnboarding && (
        <Header
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          onBack={handleBack}
          tripTitle={trip.title}
          tripSubtitle={trip.squadName}
          featuredTitle={getFeaturedTrip(featuredTripId)?.title}
          onShare={() => setIsInviteOpen(true)}
        />
      )}

      {/* Screen Views Container with safe top padding for sticky header */}
      <main className={`flex-1 w-full ${isOnboarding ? '' : 'pt-16'}`}>
        {currentScreen === 'tipo-viajero' && (
          <TravelerTypeScreen
            selected={travelerTypes}
            onChange={setTravelerTypes}
            onContinue={() => navigateTo('importancia')}
            onSkip={() => navigateTo('entrar')}
          />
        )}

        {currentScreen === 'importancia' && (
          <TravelPrioritiesScreen
            scores={priorities}
            onChange={setPriority}
            onBack={handleBack}
            onContinue={() => navigateTo('entrar')}
            onSkip={() => navigateTo('entrar')}
          />
        )}

        {currentScreen === 'entrar' && (
          <EnterAccountScreen
            onSignIn={signIn}
            onCreateAccount={() => navigateTo('crear-cuenta')}
            onSkip={enterHome}
          />
        )}

        {currentScreen === 'crear-cuenta' && (
          <CreateAccountScreen
            initialEmail={signupEmail}
            onBack={handleBack}
            onSubmit={(email) => {
              setSignupEmail(email);
              navigateTo('revisar-correo');
            }}
          />
        )}

        {currentScreen === 'cargando' && <LoadingTripScreen />}

        {currentScreen === 'revisar-correo' && (
          <CheckEmailScreen
            email={signupEmail}
            onBack={handleBack}
            onActivate={() => {
              applyCreatedAccount(signupEmail);
              setSignupEmail('');
              signIn('cuenta');
            }}
          />
        )}

        {currentScreen === 'inicio' && (
          <HomeScreen
            trip={trip}
            account={account}
            onNavigate={navigateTo}
            onOpenContribute={() => setIsContributeOpen(true)}
            onOpenVote={() => setIsVoteOpen(true)}
            onOpenCreate={() => setIsCreateOpen(true)}
            onSignIn={signIn}
            likedCards={likedCards}
            onToggleLike={toggleLike}
            onOpenFeatured={openFeaturedTrip}
          />
        )}

        {currentScreen === 'filtros' && (
          <FiltersScreen
            filters={searchFilters}
            onChange={setSearchFilters}
            onDone={handleBack}
          />
        )}

        {currentScreen === 'buscar' && (
          <ExploreScreen
            onNavigate={navigateTo}
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        )}

        {currentScreen === 'viaje-destacado' && (
          <FeaturedTripScreen tripId={featuredTripId} />
        )}

        {currentScreen === 'detalle-viaje' && (
          <TripDetailScreen
            trip={trip}
            onNavigate={navigateTo}
            onOpenContribute={() => setIsContributeOpen(true)}
            onOpenVote={() => setIsVoteOpen(true)}
            onOpenInvite={() => setIsInviteOpen(true)}
            onVote={handleVote}
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        )}

        {currentScreen === 'ofertas' && <OffersScreen />}

        {currentScreen === 'favoritos' && (
          <FavoritesScreen
            likedCards={likedCards}
            onToggleLike={toggleLike}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'alcancia' && (
          <PiggybankScreen
            trip={trip}
            onOpenContribute={() => setIsContributeOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'parche' && (
          <SquadScreen
            trip={trip}
            onOpenInvite={() => setIsInviteOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'perfil' && (
          <ProfileScreen
            trip={trip}
            account={account}
            onNavigate={navigateTo}
            onOpenContribute={() => setIsContributeOpen(true)}
            onSignOut={signOut}
          />
        )}

        {currentScreen === 'landing' && (
          <LandingScreen
            onEnterApp={() => navigateTo('inicio')}
            onContinueWithGoogle={() => signIn('google')}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      {showBottomNav && (
        <BottomNav
          activeScreen={currentScreen}
          onNavigate={navigateTo}
          account={account}
        />
      )}

      {/* Global Interactive Modals */}
      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
        onSuccess={handleContributeSuccess}
        currentSaved={trip.totalSaved}
        totalGoal={trip.totalGoal}
        tripTitle={trip.title}
        members={trip.members.map((m) => ({ id: m.id, name: m.name, role: m.role }))}
      />

      <VoteModal
        isOpen={isVoteOpen}
        onClose={() => setIsVoteOpen(false)}
        poll={trip.poll}
        onVote={handleVote}
        onAddOption={handleAddPollOption}
      />

      <CreateTripModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateTrip}
        currentTripTitle={trip.title}
      />

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        tripTitle={trip.title}
      />
    </div>
  );
}
