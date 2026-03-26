import { Mail, Phone, Briefcase } from 'lucide-react';
import Avatar from './Avatar';

const ContactCard = ({ contact, onView, onEdit, onDelete }) => {
  const groupColors = {
    Work: '#3B82F6',
    Personal: '#10B981',
    Family: '#F59E0B',
    Other: '#6B7280'
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
      onClick={() => onView(contact)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
        <Avatar name={contact.name} size={50} />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>
            {contact.name}
          </h3>
          <span
            style={{
              display: 'inline-block',
              marginTop: '4px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: groupColors[contact.group] + '20',
              color: groupColors[contact.group]
            }}
          >
            {contact.group}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '14px' }}>
          <Mail size={16} />
          <span>{contact.email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '14px' }}>
          <Phone size={16} />
          <span>{contact.phone}</span>
        </div>
        {contact.company && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '14px' }}>
            <Briefcase size={16} />
            <span>{contact.company}</span>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          gap: '10px'
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(contact);
          }}
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(contact._id);
          }}
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
