datafile="../data/data.dat"
touch $datafile && RANDOM=$$
for i in $(seq 100)
  do
  chance=$[ $RANDOM % 2 ]
  if [ $chance -eq 0 ]; then
    echo "# Data Point: $RANDOM"
  else
    echo "Data Point: $RANDOM"
  fi
done >> $datafile
