import ContactComponent from '../components/Contact';

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  return (
    <ul>
      {contacts.map((props) => {
        return <ContactComponent key={props.id} {...props} />;
      })}
    </ul>
  );
}
