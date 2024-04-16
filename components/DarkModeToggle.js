import { Switch } from 'react-native';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((previousState) => !previousState);
  
  return (
    <Switch onValueChange={toggleDarkMode} value={darkMode} />
  )
}