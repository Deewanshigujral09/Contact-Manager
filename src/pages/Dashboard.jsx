import { useState, useContext, useMemo } from 'react';
import { Search, Plus, LogOut, Users } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ContactContext } from '../context/ContactContext';
import ContactCard from '../components/ContactCard';
import ContactModal from '../components/ContactModal';
import ContactDetail from '../components/ContactDetail';
import Toast from '../components/Toast';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { contacts, addContact, editContact, removeContact } = useContext(ContactContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [toast, setToast] = useState(null);

  const groups = ['All', 'Work', 'Personal', 'Family', 'Other'];

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm);
      const matchesGroup = selectedGroup === 'All' || contact.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [contacts, searchTerm, selectedGroup]);

  const handleAddContact = () => {
    setSelectedContact(null);
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowDetail(true);
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const result = await removeContact(id);
      if (result.success) {
        setToast({ message: 'Contact deleted successfully', type: 'success' });
      } else {
        setToast({ message: result.message, type: 'error' });
      }
    }
  };

  const handleSaveContact = async (contactData) => {
    const result = selectedContact
      ? await editContact(selectedContact._id, contactData)
      : await addContact(contactData);

    if (result.success) {
      setShowModal(false);
      setToast({
        message: `Contact ${selectedContact ? 'updated' : 'created'} successfully`,
        type: 'success'
      });
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          marginBottom: '30px'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={28} color="#667eea" />
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1F2937' }}>
              Contact Manager
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#6B7280', fontSize: '14px' }}>
              Welcome, {user?.name}
            </span>
            <button
              onClick={logout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 16px',
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            marginBottom: '25px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
              <Search
                size={20}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
              />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              onClick={handleAddContact}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}
            >
              <Plus size={20} />
              Add Contact
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedGroup === group ? '#667eea' : '#F3F4F6',
                  color: selectedGroup === group ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {filteredContacts.length === 0 ? (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '60px 20px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Users size={64} color="#D1D5DB" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: '#6B7280' }}>
              No contacts found
            </h3>
            <p style={{ margin: 0, color: '#9CA3AF', fontSize: '14px' }}>
              {searchTerm || selectedGroup !== 'All'
                ? 'Try adjusting your search or filter'
                : 'Add your first contact to get started'}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              paddingBottom: '40px'
            }}
          >
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onView={handleViewContact}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setShowModal(false)}
          onSave={handleSaveContact}
        />
      )}

      {showDetail && (
        <ContactDetail
          contact={selectedContact}
          onClose={() => setShowDetail(false)}
          onEdit={handleEditContact}
        />
      )}
    </div>
  );
};

export default Dashboard;
