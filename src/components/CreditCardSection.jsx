import { useState } from 'react';
import { CreditCard, CheckCircle, PlusCircle, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { addCreditCard } from '../services/api';
import { EmptyState } from './States';

const CreditCardSection = () => {
  const { creditCards, payBill, refreshData } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({ cardName: '', statementDay: 1, dueDay: 15 });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      await addCreditCard({
        cardName: newCard.cardName,
        statementDay: Number(newCard.statementDay),
        dueDay: Number(newCard.dueDay)
      });
      setShowAddForm(false);
      setNewCard({ cardName: '', statementDay: 1, dueDay: 15 });
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-[-0.03em] text-[color:var(--text-primary)]">
          <CreditCard className="text-[color:var(--brand)]" /> Credit Cards & Liabilities
        </h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-secondary px-4 py-2 text-sm"
        >
          <PlusCircle size={16} /> Add Card
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCard} className="surface-card-strong mb-5 flex flex-col gap-4 p-5 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="label-text text-xs">Card Name</label>
            <input 
              required
              className="input-field text-sm"
              value={newCard.cardName}
              onChange={e => setNewCard({...newCard, cardName: e.target.value})}
              placeholder="e.g. Chase Sapphire"
            />
          </div>
          <div className="w-24">
            <label className="label-text text-xs">Statement Day</label>
            <input 
              type="number" min="1" max="31" required
              className="input-field text-sm"
              value={newCard.statementDay}
              onChange={e => setNewCard({...newCard, statementDay: e.target.value})}
            />
          </div>
          <div className="w-24">
            <label className="label-text text-xs">Due Day</label>
            <input 
              type="number" min="1" max="31" required
              className="input-field text-sm"
              value={newCard.dueDay}
              onChange={e => setNewCard({...newCard, dueDay: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-primary mb-[2px] px-5 py-3 text-sm">
            Save
          </button>
        </form>
      )}

      {creditCards && creditCards.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {creditCards.map(card => (
            <div key={card.id} className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(160deg,#132033_0%,#0f172a_72%,#12243f_100%)] p-5 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]">
              <div className="absolute -right-6 -top-6 text-white/5">
                <CreditCard size={120} />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,160,255,0.24),transparent_26%)]" />
              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Card account</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-100">{card.cardName}</h3>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-2.5 text-[#8eb4ff]">
                    <Sparkles size={18} />
                  </div>
                </div>
                
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-xs text-slate-400">Outstanding</p>
                    <p className="text-xl font-bold">{formatCurrency(card.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-slate-400">Due Amount</p>
                    <p className="text-xl font-bold text-[#f5c97a]">{formatCurrency(card.dueAmount)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Due Date</p>
                    <p className="text-sm font-medium">
                      {card.dueDate ? format(new Date(card.dueDate), 'MMM dd, yyyy') : 'N/A'}
                    </p>
                  </div>
                  
                  {!card.isPaid && card.dueAmount > 0 ? (
                    <button 
                      onClick={() => payBill(card.id, card.currentStatementMonth)}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      <CheckCircle size={14} /> Mark Paid
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/12 px-3 py-2 text-xs font-semibold text-emerald-300">
                      <CheckCircle size={14} /> Settled
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CreditCard}
          title="No credit cards added yet"
          description="Add a card to monitor due amounts, statement cycles, and settlement status in one place."
        />
      )}
    </div>
  );
};

export default CreditCardSection;
