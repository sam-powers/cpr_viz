var crime_data;

d3.csv("vis_data.csv").then(function (d) {
    crime_data = d;
    
          // format the data
          crime_data.forEach(function (d) {
              d.disposition = d.DISPOSITION_TYPE;
              d.crimeCode = d.PRIMARY_CRIME_CODE;
              d.jurisdiction = d.JURISDICTION;
              d.country = d.COUNTRY;
              d.naics = d.NAICS;
              d.bank = d.FINANCIAL_INSTITUTION;
              d.publicCo = d.US_PUBLIC_CO;
              d.year = (new Date(d.DATE)).getFullYear();
              d.money_type = d.money_type;
              d.amount = d.amount;
           //   d.totalPayment = d.TOTAL_PAYMENT;
            //  d.addPayment = d.ADDITIONAL_REGULATORY_FINE_OR_PAYMENT;
        //      d.commService = d.COMMUNITY_SERVICE_OR_OTHER;
        //      d.fine = d.FINE;
        //      d.forfeiture = d.FORFEITURE_DISGORGEMENT;
        //      d.restitution = d.RESTITUTION;
              d.probation = d.PROBATION_LENGTH;
          });
    
    
    
    drawBar(crime_data);
    draw_controls(crime_data);
})