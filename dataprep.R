library(tidyverse)

setwd("/Volumes/GoogleDrive/My Drive/Freelance/NonProsecution")
dat <- read_csv("corp-crime-20201117.csv")

View(dat)

length(dat$NAICS)
length(unique(dat$NAICS))

use_dat <-
dat %>%
  gather(
    money_type, 
    amount,
    -c(DISPOSITION_TYPE:DATE, PROBATION_LENGTH)
    
  ) %>% 
  mutate(money_type = str_to_sentence(str_replace_all(money_type, "_", " "))) 





use_dat %>%
  write_csv(., path = "vis_data.csv")
