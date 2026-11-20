import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyboardShortcuts, DEFAULT_SHORTCUTS } from '../hooks/useKeyboardShortcuts';
import { Button } from '../components/Button';
import { CommandPalette, CommandPaletteAction } from '../components/CommandPalette';
import { ShortcutsHelp } from '../components/ShortcutsHelp';
import { QueuePanel } from '../features/queue/components/QueuePanel';
import { DoctorInbox } from '../features/messaging/components/DoctorInbox';
import { AbnormalResultsInbox } from '../features/results/components/AbnormalResultsInbox';
import { UnreadBadge } from '../features/messaging/components/UnreadBadge';
import styles from './DoctorDashboardPage.module.css';

export function DoctorDashboardPage() {
  const navigate = useNavigate();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const bindings: Record<string, string> = Object.fromEntries(
    DEFAULT_SHORTCUTS.map((b) => [b.action, b.key]),
  );

  useKeyboardShortcuts({
    bindings,
    onAction: (action) => {
      switch (action) {
        case 'open-palette':
          setPaletteOpen(true);
          break;
        case 'open-help':
          setHelpOpen(true);
          break;
        case 'next-patient':
          // Navigate to next patient (stub - would integrate with queue state)
          // navigate('/doctor/queue');
          break;
        case 'open-chart':
          // Open chart view (stub)
          // navigate('/doctor/chart');
          break;
        case 'sign-note':
          // Sign note (stub)
          // break;
        default:
          break;
      }
    },
  });

  const actions: CommandPaletteAction[] = [
    {
      id: 'queue',
      label: "Open today's queue",
      category: 'navigation',
      shortcut: 'mod+1',
      run: () => {
        setPaletteOpen(false);
        navigate('/doctor/queue');
      },
    },
    {
      id: 'inbox',
      label: 'Open messages inbox',
      category: 'navigation',
      shortcut: 'mod+2',
      run: () => {
        setPaletteOpen(false);
        navigate('/doctor/messages');
      },
    },
    {
      id: 'consultation',
      label: 'Start next visit',
      category: 'context',
      shortcut: 'mod+3',
      run: () => {
        setPaletteOpen(false);
        // Navigate to the next checked-in appointment, or to new consultation if none
        navigate('/doctor/consultation/new');
      },
    },
    {
      id: 'insights',
      label: 'Open practice insights',
      category: 'navigation',
      shortcut: 'mod+4',
      run: () => {
        setPaletteOpen(false);
        navigate('/doctor/insights');
      },
    },
    {
      id: 'abnormal-results',
      label: 'Results needing review',
      category: 'navigation',
      shortcut: 'mod+5',
      run: () => {
        setPaletteOpen(false);
        // Scroll/focus the results section
        const resultsSection = document.querySelector(
          '.results-needing-review',
        ) as HTMLElement | null;
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
    },
  ];

  return (
    <div className="container">
      <header className={styles.dashboardHeader}>
        <h1>Doctor dashboard</h1>
        <div className={styles.dashboardHeaderRight}>
          <UnreadBadge />
          <Button variant="secondary" onClick={() => navigate('/doctor/insights')}>
            Practice insights
          </Button>
          <Button variant="secondary" onClick={() => setHelpOpen(true)}>
            Shortcuts (?)
          </Button>
          <Button onClick={() => setPaletteOpen(true)}>
            Command palette (⌘K)
          </Button>
        </div>
      </header>

      <QueuePanel />

      <div className={styles.dashboardGrid}>
        <section className={styles.card}>
          <h2>Today's appointments</h2>
          <p>Appointments for today open in the live queue once the patient checks in.</p>
        </section>

        <section className={styles.card}>
          <h2>Messages</h2>
          <DoctorInbox />
        </section>

        <section className={styles.card}>
          <AbnormalResultsInbox />
        </section>
      </div>

      <CommandPalette
        actions={actions}
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
      <ShortcutsHelp open={helpOpen} onClose={() => setHelpOpen(false)} bindings={bindings} />
    </div>
  );
}