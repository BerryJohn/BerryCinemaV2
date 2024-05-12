import ManageArticle from "./components/ManageSection";
import VideoSection from "./components/VideoSection";

const App = () => {
  return (
    <main className="w-full h-auto text-white">
      <VideoSection />
      <ManageArticle />
    </main>
  );
};

export default App;
