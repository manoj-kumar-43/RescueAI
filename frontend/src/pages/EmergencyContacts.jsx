import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function EmergencyContacts() {
  const {
    contactsList,
    addContact,
    deleteContact,
    toggleContactStatus,
    alertRules,
    setAlertRules,
    notifyContacts,
    recentActivity,
    isAuthenticated,
    setShowAuthModal
  } = useContext(AppContext);

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    addContact({ name, relationship: relationship || 'Contact', phone });
    setName('');
    setRelationship('');
    setPhone('');
    setShowAddForm(false);
  };

  const handleBroadcast = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    notifyContacts();
  };

  return (
    <div className="flex-1 w-full pt-4 pb-12 px-container-margin-mobile md:px-container-margin-desktop overflow-y-auto max-w-7xl mx-auto flex flex-col gap-stack-lg">
      <header className="mb-2">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-background font-black">
          Emergency Contacts
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
          Manage your trusted contacts and automated alerts.
        </p>
      </header>

      {/* Broadcast Alert Banner */}
      <section className="bg-surface-container-lowest border border-error/30 rounded-xl p-6 shadow-[0_4px_12px_rgba(186,26,26,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-error/5 opacity-50 z-0 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline-md text-headline-md text-error flex items-center font-bold">
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                campaign
              </span>
              Broadcast Emergency Status
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Instantly notify all active contacts of your current location and triage status.
            </p>
          </div>
          <button
            onClick={handleBroadcast}
            className="bg-error text-on-error font-action-xl text-action-xl px-8 py-4 rounded-xl shadow-md hover:bg-error/90 active:scale-95 transition-all flex-shrink-0 w-full md:w-auto h-[56px] flex items-center justify-center font-bold"
          >
            Broadcast Now
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        {/* Left Column: Contact List */}
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          <section>
            <div className="flex justify-between items-center mb-stack-md">
              <h3 className="font-headline-md text-headline-md text-on-background font-bold">
                Trusted Contacts
              </h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-primary font-label-bold text-label-bold flex items-center hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                <span className="material-symbols-outlined mr-2">person_add</span>
                {showAddForm ? 'Close Form' : 'Add Contact'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddContact} className="bg-surface-container-low border border-outline-variant p-5 rounded-xl mb-6 flex flex-col gap-4 animate-fade-in">
                <h4 className="font-bold text-on-surface">New Contact Info</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Contact Name (e.g. John Doe)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border border-outline rounded-lg bg-surface text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Relationship (e.g. Brother)"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="p-3 border border-outline rounded-lg bg-surface text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Phone number (+1...)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3 border border-outline rounded-lg bg-surface text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start bg-primary text-on-primary font-bold px-6 py-2.5 rounded-lg hover:bg-primary-container"
                >
                  Save New Contact
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactsList.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-5 hover:border-primary/50 transition-colors shadow-sm relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                          person
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-bold text-label-bold text-on-background text-lg font-bold">
                          {contact.name}
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                          {contact.relationship}
                        </p>
                      </div>
                    </div>

                    <span className={`font-label-bold text-xs px-2.5 py-1 rounded-full border ${
                      contact.status === 'Active'
                        ? 'bg-tertiary-container/10 text-tertiary border-tertiary/20'
                        : 'bg-surface-variant text-on-surface-variant border-outline-variant'
                    }`}>
                      {contact.status}
                    </span>
                  </div>

                  <div className="flex items-center text-on-surface-variant font-body-md text-body-md mb-4 font-semibold">
                    <span className="material-symbols-outlined mr-2 text-sm">phone</span>
                    {contact.phone}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="flex-1 border border-outline-variant rounded-lg py-2 font-label-bold text-label-bold hover:bg-error-container hover:text-error transition-colors text-on-surface-variant"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => toggleContactStatus(contact.id)}
                      className="flex-1 bg-surface-container-high text-on-surface rounded-lg py-2 font-label-bold text-label-bold hover:bg-surface-variant transition-colors flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-sm mr-1">
                        {contact.status === 'Active' ? 'notifications_off' : 'notifications'}
                      </span>
                      {contact.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Settings & Alerts History */}
        <div className="lg:col-span-4 flex flex-col gap-stack-lg">
          {/* Notification Settings */}
          <section className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-6 shadow-sm">
            <h3 className="font-headline-md text-headline-md text-on-background mb-4 flex items-center font-bold">
              <span className="material-symbols-outlined mr-2">settings</span>
              Auto-Alert Rules
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-6">
              Configure when active contacts are automatically notified based on triage level.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-error/20 rounded-lg bg-error/5">
                <div>
                  <div className="font-label-bold text-label-bold text-error flex items-center font-bold">
                    <div className="w-2 h-2 rounded-full bg-error mr-2"></div>
                    Critical Status
                  </div>
                  <div className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">
                    Always notify all active contacts immediately.
                  </div>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={true}
                    className="absolute block w-6 h-6 rounded-full bg-on-secondary border-4 appearance-none cursor-not-allowed border-error bg-error right-0"
                  />
                  <label className="block overflow-hidden h-6 rounded-full bg-error cursor-not-allowed opacity-50"></label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-outline-variant/50 rounded-lg">
                <div>
                  <div className="font-label-bold text-label-bold text-secondary-container flex items-center font-bold">
                    <div className="w-2 h-2 rounded-full bg-secondary-container mr-2"></div>
                    Urgent Status
                  </div>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200">
                  <input
                    type="checkbox"
                    checked={alertRules.urgent}
                    onChange={(e) => setAlertRules({ ...alertRules, urgent: e.target.checked })}
                    className="absolute block w-6 h-6 rounded-full bg-on-secondary border-4 appearance-none cursor-pointer border-primary transition-transform duration-200 checked:translate-x-full checked:bg-primary"
                  />
                  <label className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                    alertRules.urgent ? 'bg-primary/30' : 'bg-surface-variant'
                  }`}></label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-outline-variant/50 rounded-lg">
                <div>
                  <div className="font-label-bold text-label-bold text-primary flex items-center font-bold">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    Moderate Status
                  </div>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200">
                  <input
                    type="checkbox"
                    checked={alertRules.moderate}
                    onChange={(e) => setAlertRules({ ...alertRules, moderate: e.target.checked })}
                    className="absolute block w-6 h-6 rounded-full bg-on-secondary border-4 appearance-none cursor-pointer border-primary transition-transform duration-200 checked:translate-x-full checked:bg-primary"
                  />
                  <label className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                    alertRules.moderate ? 'bg-primary/30' : 'bg-surface-variant'
                  }`}></label>
                </div>
              </div>
            </div>
          </section>

          {/* Alert Broadcast timeline */}
          <section className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-6 shadow-sm">
            <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center font-bold">
              <span className="material-symbols-outlined mr-2">history</span>
              Alert Broadcasts History
            </h3>

            <div className="relative pl-4 border-l-2 border-outline-variant/30 space-y-6">
              {recentActivity.filter(a => a.type === 'broadcast' || a.type === 'profile').map((act) => (
                <div key={act.id} className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-tertiary rounded-full border-2 border-surface-container-lowest"></div>
                  <p className="font-label-bold text-label-bold text-on-background font-bold">
                    {act.title}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">
                    {act.description}
                  </p>
                  <p className="font-body-md text-body-md text-outline text-xs mt-1 font-semibold">
                    {act.time}
                  </p>
                </div>
              ))}

              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-outline rounded-full border-2 border-surface-container-lowest"></div>
                <p className="font-label-bold text-label-bold text-on-background font-bold">Setup Completed</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">System configured and emergency rules activated.</p>
                <p className="font-body-md text-body-md text-outline text-xs mt-1 font-semibold">Oct 20, 2023</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
