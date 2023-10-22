import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    window.localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className="text-left p-4">
      <h2 className="text-3xl mb-4 font-bold tracking-tight flex items-center justify-between">
        Dashboard
        <Button onClick={handleLogout} variant="outline">
          Sair
        </Button>
      </h2>
      <Separator />
    </div>
  );
}

export default Header;
