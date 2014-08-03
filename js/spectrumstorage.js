$SWB.addSpectrum = function(params){
    tempData = {
        id: this.usable_id,
        title: params['title'],
        desc: params['desc'],
        tags: params['tags'],
        date: Date(),
        data: JSON.stringify($W.data),
        dataurl: $W.canvas.toDataURL()
    }

    this.updateSpectrumData()
    this.spectral_data[this.usable_id] = tempData
    this.usable_id++
    this.count++

    //Adding to localStorage
    localStorage.setItem("SWBSpectrumData", JSON.stringify(this.spectral_data))

    this.just_saved = true
}

$SWB.deleteSpectrum = function(spec_id){
    this.updateSpectrumData()
    delete this.spectral_data[spec_id]

    //Deleting from localStorage
    localStorage.setItem("SWBSpectrumData", JSON.stringify(this.spectral_data))
}

$SWB.modifySpectrum = function(params, spec_id){
    tempData = {
        id: this.usable_id,
        title: params['title'],
        desc: params['desc'],
        tags: params['tags'],
        date: Date(),
        data: JSON.stringify($W.data),
        dataurl: $W.canvas.toDataURL()
    }

    this.updateSpectrumData()
    this.spectral_data[spec_id] = tempData

    //Adding to localStorage
    localStorage.setItem("SWBSpectrumData", JSON.stringify(this.spectral_data))
}

$SWB.updateSpectrumData = function(){
    this.spectral_data = JSON.parse(localStorage.getItem("SWBSpectrumData"));
    this.spectral_data = this.spectral_data || {};

    max_id = 0
    count = 0

    for(key in this.spectral_data) {
      if(this.spectral_data.hasOwnProperty(key)) {
        if(max_id < Number(key)) max_id = Number(key);
        count++;
      }
    }

    this.usable_id = max_id + 1
    this.count = count
}

$SWB.saveSpectrumForm = function(){
    inputs = $('#spectrumform :input')
    details = {
        'title': inputs[0].value,
        'desc': inputs[1].value,
        'tags': inputs[2].value
    }

    $SWB.addSpectrum(details)
}

$SWB.getRenderableThumbs = function(){
    string = ""
    $.each(this.spectral_data, function(index, spec){
        string = string + '\
        <div class="col-sm-6 col-md-3">\
          <div class="thumbnail">\
            <img src="'+spec['dataurl']+'" alt="'+spec['title']+'">\
            <div class="caption">\
              <h4>'+spec['title']+'</h4>\
            </div>\
          </div>\
        </div>\
        '
    })

    return string
}

$SWB.updateSpectrumData()
