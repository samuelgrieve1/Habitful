import ScreenWrapper from "../components/ScreenWrapper"
import DarkModeToggle from "../components/settings/DarkModeToggle"
import Container from "../components/Container"

export default function Settings() {
  return (
    // <ScreenWrapper>
    //   <DarkModeToggle />
    // </ScreenWrapper>
    <Container>
      <DarkModeToggle />
    </Container>
  )
}