import { Card, CardHeader } from "../components/ui/card"
import Button from "../components/ui/button"


const NavBar = () => {
  return (
   
      <nav className="w-full ">
      <Card className="w-full  mx-auto bg-black text-white border-none">
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 p-2 rounded-full">
            Logo
          </div>
          <div className="flex gap-2 sm:gap-4">
            
              <Button  variant="outline" className="text-xs sm:text-sm">
                <a href="/new">New Lesson</a>
                </Button>
                
            <Button variant="outline" className="text-xs sm:text-sm">
              <a href="/view">View all lessons</a>
            </Button>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="bg-orange-500 hover:bg-orange-600"
        >
          
          <span className="hidden sm:inline">Logout</span>
        </Button>
        </CardHeader>
        </Card>
        </nav>
    
  );
}

export default NavBar;
