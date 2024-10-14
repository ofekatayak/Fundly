import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import './BuyInvest.css';
import Button from '../../../cummon/Button';
import { useUserPurchedContext } from '../../../../context/PurchedContext';
import Invest from '../../../../models/Invest';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useModal } from '../../../../context/popupContext';
import { useAppStatus } from '../../../../context/AppStatusContext';
import { ClipLoader } from 'react-spinners';

interface buyInvestProps {
  investorUid: string;
  companyUid: string;
  minInvest: number;
}

const BuyInvest: React.FC<buyInvestProps> = ({
  investorUid,
  companyUid,
  minInvest,
}) => {
  const pricePerStock = 1500;
  const [stockAmount, setStockAmount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(pricePerStock);
  const { buyInvestment } = useUserPurchedContext();
  const { closeModal } = useModal();
  const { loading } = useAppStatus();

  useEffect(() => {
    setTotalAmount(stockAmount * pricePerStock);
  }, [stockAmount, pricePerStock]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setStockAmount(newValue);
    }
  };

  const handleBuyNow = async () => {
    if (totalAmount >= minInvest) {
      await buyInvestment(
        new Invest(investorUid, companyUid, stockAmount, totalAmount)
      );
      closeModal();
    } else {
      const min = minInvest.toString();
      toast.error('The minimum amount is ' + min);
    }
  };

  if (loading)
    return <ClipLoader color="#39958c" loading={loading} size={50} />;

  return (
    <div className="buy-container">
      <div className="buy-item">
        <label className="lable">Stock amount</label>
        <CustomSlider
          aria-label="Stock amount"
          value={stockAmount}
          step={1}
          valueLabelDisplay="off"
          min={1}
          max={100}
          onChange={handleSliderChange}
        />
      </div>

      <label className="lable"> Stocks: {stockAmount}</label>
      <label className="lable"> Cost: {totalAmount}$</label>

      <Button
        label={'Buy now!'}
        onClick={handleBuyNow}
        color={'white'}
        backgroundColor={'#39958c'}
        borderColor={''}
      />
    </div>
  );
};

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: '#39958c',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#39958c',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}));

export default BuyInvest;
