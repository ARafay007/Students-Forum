const fetchAllCity = async () => {
    try{
        const resp = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'country': 'pakistan'
            })
        });
        const data = await resp.json();
        return data.data;
    }
    catch(err){
        console.log(`💥💥💥city list error💥💥💥 ${err}`);
    }
}

export default fetchAllCity;