import React, { useState } from "react";
import AramaCubugu from "./bilesenler/AramaCubugu/AramaCubugu";
import Gonderiler from "./bilesenler/Gonderiler/Gonderiler";
import sahteVeri from "./sahte-veri"

/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin


// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import "./App.css";

const App = () => {
   
  const [posts, setPosts] = useState(sahteVeri);
 const [search, setSearch] = useState('');
 const [favs,setfavs] = useState([])
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.
  const searchChangeHandler = (e) => {
   const {value} = e.target;
   setSearch(value);
   const searchResult = sahteVeri.filter((item) =>{
    return item.username.includes(value);
   
   })
    setPosts(searchResult);
   
  };

  const gonderiyiBegen = (gonderiID) => {
    const guncelPosts = posts.map((item) =>{
      if(item.id ===gonderiID  ){
        if(!favs.includes(gonderiID)){
        item.likes++;
        setfavs([...favs,gonderiID]);
      }
      else {
        item.likes--;
        favs.splice(favs.indexOf(gonderiID), 1);
        setfavs([...favs]);
      }
    }
      return item;
    })
    setPosts(guncelPosts);
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */
  };

  return (
    <div className="App">
      {/* Yukarıdaki metni projeye başladığınızda silin*/}
      <AramaCubugu search={search} changeHandler={searchChangeHandler} />
      <Gonderiler gonderiyiBegen={gonderiyiBegen} gonderiler={posts} />
      {/* AramaÇubuğu ve Gönderiler'i render etmesi için buraya ekleyin */}
      {/* Her bileşenin hangi proplara ihtiyaç duyduğunu kontrol edin, eğer ihtiyaç varsa ekleyin! */}
    </div>
  );
};

export default App;
