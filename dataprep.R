library(tidyverse)

setwd("/Volumes/GoogleDrive/My Drive/Freelance/NonProsecution/cpr_viz")
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
  mutate(money_type = str_to_sentence(str_replace_all(money_type, "_", " "))) %>%
  separate_rows(COUNTRY, sep = ",") %>%  # try to clean up the ones that have multiple countries but all the country names are the same. 
    distinct() %>%
    group_by(across(-COUNTRY)) %>%
    arrange(COUNTRY) %>%                 # Order the ones with duplicate countries the same way so they will collapse in summary
    summarize(COUNTRY = paste0(COUNTRY, collapse = ", ")) %>% # Paste the non-duplicate multiple country ones back together
  ungroup() %>%
  arrange(COUNTRY, desc(money_type))

str(use_dat)


use_dat %>%
  write_csv(., path = "vis_data.csv")
