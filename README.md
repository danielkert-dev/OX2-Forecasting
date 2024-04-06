# Projektdocumentation för OX2-Forecasting
2024.02.02

## Om projektet

<p> 
Vår grupp DAME som har fyra medlemmar, Daniel K., Aron E., Maria E. och Emil H. och vi hade en uppgift att göra en webbapplikation som utvecklas till OX2. Kraven från handledaren var att ha en presentbar websida (Forecasting projekt för vår grupp) som sammlas ihop till en central websida där man kommer ha möglighet att see allas projekter på en plats och presentera till OX2 i slutet.

Med forecasting menas att vi skapar en prognosning till energy producerat i framtiden från Möckelö Solpark som kommer bli byggd av OX2. Från hur det kommer se ut nästa timme till hur mycket det kommer producera efter flera månader. 

Timeline att utveckla projektet är tre månader från Januari 7 till Mars 18 där men vår team blir klart med en slut produkt mycket tidigare.
</p>

## Funktionalitet

<p> 
OX2 Forecasting Möckelö är hur vi tänkte att projektet heter, har flera funktionaliteter som kan användas på en browser. Sidan har en stor "skrollbar" i mitten där man kan dra till höger och vänster beroende vad man vill se. Under "scrollbar"´en finns det data på Energy produkton, Väder, Trolighet och om man kollar på månads vis då ser man sol ljust tid iställe fär väder. På toppen är det möjglit att ändra timme, dagen eller månad beroende vilken flik man är på som kan väljas också på toppen av sidan. På botten finns det möglighet att välja Om fliken som beskriver mer om hur man har kalkulerat fram data som presenteras.
</p>


## Teknologi och struktur

<p> 
För att utveckla websidan vi använde Vue 3 för struktur och underlätta processen med Bootstrap och Sass att snygga up allt. Med Vue 3 hadde vi möglighet att gör sidan reaktiv med lite kod och lätt att förstå struktur. 

Hela kodbas är under src folder som var inisaliserad med NodeJS och sen byggd på i hand. Websidans sidor är delat i views och komponenter att snygga upp långa texter av kod. Utils folder har funktioner som fixar fetching från APIs som vi använder och stores att hålla reaktiva globala variabler med pinia. 
</p>

## API

<p> 
Vi använder Wordpress för att hämta längre text och bilder som vi använder och det fetchar vi på sidan. Open Metro är den API som vi använder att kalkulera vår gissning av energy produktion och väder data. Det var en möjlighet att använda en api från OX2 men vi insåg att det var inte kritisk att använda för vår projekt. 
</p>
