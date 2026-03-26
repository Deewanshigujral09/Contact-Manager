import { X, Mail, Phone, Briefcase, Tag } from 'lucide-react';
import Avatar from './Avatar';

const ContactDetail = ({ contact, onClose, onEdit }) => {
  const groupColors = {
    Work: '#3B82F6',
    Personal: '#10B981',
    Family: '#F59E0B',
    Other: '#6B7280'
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          width: '90%',
          maxWidth: '500px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#1F2937' }}>
            Contact Details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              color: '#6B7280'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <Avatar name={contact.name} size={80} />
          <h3 style={{ margin: '15px 0 5px', fontSize: '22px', fontWeight: '600', color: '#1F2937' }}>
            {contact.name}
          </h3>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: groupColors[contact.group] + '20',
              color: groupColors[contact.group]
            }}
          >
            {contact.group}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6'
              }}
            >
              <Mail size={20} />
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#6B7280' }}>Email</p>
              <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{contact.email}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981'
              }}
            >
              <Phone size={20} />
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#6B7280' }}>Phone</p>
              <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{contact.phone}</p>
            </div>
          </div>

          {contact.company && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F59E0B'
                }}
              >
                <Briefcase size={20} />
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#6B7280' }}>Company</p>
                <p style={{ margin: 0, fontSize: '16px', color: '#1F2937' }}>{contact.company}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#F3F4F6',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(contact);
            }}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Edit Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
