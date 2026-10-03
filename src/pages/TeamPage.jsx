import { useState } from 'react';
import Footer from '../components/Footer';
import ExecutiveTree from '../components/HierarchyTree';
import Navbar from '../components/Navbar';
import TeamMemberModal from '../components/TeamMemberModal';
import { executiveBody, k23TeamMembers } from '../data/team';

function TeamPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div id="top" className="team-page">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="team-page-main">
        <section className="team-directory section">
          <div className="container">
            <div className="team-directory-head">
              <div>
                <span className="kicker">01 / EXECUTIVE BODY</span>
                <h2>
                  Built to <em>move together.</em>
                </h2>
              </div>
              <p>One team, moving the IET community forward together.</p>
            </div>
            <div className="team-cohort">
              <h3 className="team-cohort-title">K23 <span>Executive Body</span></h3>
              <ExecutiveTree members={k23TeamMembers} rowLabel="K23" onSelect={setSelectedMember} />
            </div>
            <div className="team-cohort">
              <h3 className="team-cohort-title">K24 <span>Executive Body</span></h3>
              <ExecutiveTree
                rowLabel="K24"
                members={[
                  ...executiveBody.generalSecretary,
                  ...executiveBody.jointSecretary,
                  ...executiveBody.executives,
                ].sort((first, second) => first.displayOrder - second.displayOrder)}
                onSelect={setSelectedMember}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}

export default TeamPage;