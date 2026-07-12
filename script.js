*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:#fff7fb;
    color:#444;
}

header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px 8%;
    background:white;
    box-shadow:0 3px 15px rgba(0,0,0,.08);
    position:sticky;
    top:0;
    z-index:1000;
}

.logo{
    font-size:32px;
    font-weight:bold;
    color:#d63384;
}

nav a{
    text-decoration:none;
    margin-left:25px;
    color:#444;
    font-weight:600;
    transition:.3s;
}

nav a:hover{
    color:#d63384;
}

.hero{
    height:90vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    background:linear-gradient(rgba(255,255,255,.65),rgba(255,255,255,.65)), url("hero.jpg");
    background-size:cover;
    background-position:center;
}

.hero h1{
    font-size:60px;
    color:#d63384;
}

.hero p{
    margin-top:15px;
    font-size:22px;
    max-width:700px;
}

.btn{
    margin-top:30px;
    padding:15px 40px;
    border-radius:40px;
    background:#ff4f93;
    color:white;
    text-decoration:none;
    font-size:18px;
    transition:.3s;
}

.btn:hover{
    background:#d63384;
}
