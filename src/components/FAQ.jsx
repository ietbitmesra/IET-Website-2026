function FAQ({ openFaq, setOpenFaq }) {
  const faqs = [
    'Who can join IET?',
    'Do I need prior coding experience?',
    'How does recruitment work?',
    'Are there membership fees?',
  ];

  return (
    <section className="section container faq" id="community">
      <div>
        <span className="kicker">07 / FAQ</span>
        <h2>
          Good questions
          <br />
          <em>welcome.</em>
        </h2>
      </div>
      <div className="faq-list">
        {faqs.map((q, i) => (
          <div className={'faq-item ' + (openFaq === i ? 'active' : '')} key={q}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <span>0{i + 1}</span>
              {q}
              <b>{openFaq === i ? '−' : '+'}</b>
            </button>
            {openFaq === i && (
              <p>
                We welcome students from every year and background. Follow our events and
                recruitment announcements to find your way in.
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
