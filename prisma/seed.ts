// prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data (in correct order due to foreign keys)
  await prisma.order_item.deleteMany();
  await prisma.reviews.deleteMany();
  await prisma.shipping.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();

  // Create addresses
  const shippingAddress = await prisma.address.create({
    data: {
      street_line1: '123 Main St',
      street_line2: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postal_code: '94102',
      country: 'USA',
    },
  });

  const billingAddress = await prisma.address.create({
    data: {
      street_line1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postal_code: '90001',
      country: 'USA',
    },
  });

  // Create customer
  const customer = await prisma.customer.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123', // Plain text for now - update schema to allow 60+ chars for bcrypt
      phone_num: '555-0123',
      fk_ship_address_id: shippingAddress.address_id,
      fk_bill_address_id: billingAddress.address_id,
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Jewelry',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home Decor',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessories',
      },
    }),
  ]);

  // Products 1-10
const products = await Promise.all([
  prisma.product.create({
    data: {
      product_id: 1,
      product_name: 'Triple Moon Goddess necklace | Pagan | Pentacle/ Pentagram Moon Charm Wicca jewelry',
      description: 'This is a simple necklace with a pentacle moon trinity charm in silver tone with an adjustable cord necklace- will complete any look and is perfect as a necklace duo or stand alone.   Fast shipping and perfect for any occasion.  We offer matching earrings— see shop for listing.',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/5faf1f/3749917486/il_fullxfull.3749917486_eunl.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 2,
      product_name: 'Whimsigoth beaded rose Flower Dangling Earrings in Bronze| Fairycore | Whimsical',
      description: 'These dangling earrings are made with champagne and black beads with bronze rose flower charm.  These are dainty mid-weight, easy to wear and so beautiful:) made with a lever back hook style for convenience-  Perfect for any day wear or a special occasion. We ship as fast as possible.',
      price: 14.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/417671/7252702817/il_fullxfull.7252702817_ikql.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 3,
      product_name: 'Whimsigoth Moon and Stars champagne Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind natural earth tones champagne beaded necklace with bronze crescent moon pendent and accent stars! The delicate champagne and bronze combination is beautiful and creatively unique. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-18 inches',
      price: 16.25,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bbdf39/7252541293/il_fullxfull.7252541293_2xex.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 4,
      product_name: 'Whimsigoth Green daisy pendant Beaded necklace in green, champagne and Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This dainty necklace is a one of a kind green and iridescent beaded bronze necklace choker! The beaded design and bronze combination is beautiful.   Necklace is complete with our popular flower  pendent charm-This necklace is handmade and quick shipping!  Pendant size— .60 inch  Each necklace will have different unique color variations and sizes - Around 15.5-17 inches',
      price: 15.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/b8aed7/7015505131/il_fullxfull.7015505131_s6bk.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 5,
      product_name: 'Bronze earth tones beaded necklace with dragonfly daisy  design  | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind earth tones  beaded necklace choker! The beaded design of champagne and brown with daisy beads on bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 15.5-17 inches',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/68132e/7067136474/il_fullxfull.7067136474_tb2u.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 6,
      product_name: 'Whimsigoth Auburn Dragonfly Beaded Bracelet in Bronze | Cottagecore | Whimsitwee',
      description: 'This beaded bracelet is matching with one of our most popular beaded necklace. The Auburn and bronze is a unique combination of colors. Nickel free alloy.  Length— 8in plus extender',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/486cf5/7078486936/il_fullxfull.7078486936_9sf7.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 7,
      product_name: 'Whimsigoth Fall Maple Leaves  Beaded Necklace in Bronze | Goblincore | Cottagecore |',
      description: 'This necklace is a beautiful mix of bronze metal and orange brown beads. The metal is bronze alloy so keep away from high moisture areas. The necklace length is between 16-17 inches.',
      price: 19.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/1d362d/7186416787/il_fullxfull.7186416787_pedj.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 8,
      product_name: 'Whimsigoth Dragonfly Auburn Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: '—-Option to add earrings, bracelet—- This is a one of a kind auburn beaded necklace choker! The beaded design and bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 15.5-17 inches',
      price: 19.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/7d399d/6670834165/il_fullxfull.6670834165_8hz0.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 9,
      product_name: 'Collide With The Sky Inspired Earrings | PTV | Emo | Alternative Jewelry |',
      description: 'These earrings are inspired by the Collide With The Sky album by Pierce The Veil. The silver and Black tones match the albums vibe seamlessly. Stainless Steel Silver and ready to ship!   Charm Length— 2-2.75 Inches  —The charm used is PLA 3D printed with a resin topcoat to keep it shiny— -EACH PAIR OF EARRINGS IS UNIQUE IN SHAPE AND COLOR DUE TO IT BEING HANDMADE! PLEASE BE MINDFUL BEFORE PURCHASING',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/e9ab2d/7077859230/il_fullxfull.7077859230_5fks.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 10,
      product_name: 'Whimsigoth Sun Auburn Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind auburn beaded necklace choker! The brown and bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 19.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/7caed7/7082321991/il_fullxfull.7082321991_aweu.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 11,
      product_name: 'Silver Skeleton Hand Cord Pendant Necklace | Gothic | Alternative',
      description: 'This necklace is a beautiful mix of silver and black tones. Lightweight and comfortable for any occasion. Nickel free alloy so keep away from areas with high moisture.  Length 18-19 inches',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/aceac5/6487998545/il_fullxfull.6487998545_h50v.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 12,
      product_name: 'Collide With The Sky Inspired Keychain | Emo | Scene | PTV | Punk',
      description: 'ONE KEYCHAIN PER PURCHASE— Pierce the Veil Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat— Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/3a9ddd/7125814921/il_fullxfull.7125814921_k06n.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 13,
      product_name: 'Welcome To Black Parade Inspired Earrings | MCR | Emo | Alternative Jewelry |',
      description: 'These earrings are inspired by the Welcome to the Black Parade album by My Chemical Romance. The silver and Black tones match the albums vibe seamlessly. Stainless Steel Silver and ready to ship!   Charm Length— 2.68-3 Inches  —The charm used is PLA 3D printed with a resin topcoat to keep it shiny— -EACH PAIR OF EARRINGS IS UNIQUE IN SHAPE AND COLOR DUE TO IT BEING HANDMADE! PLEASE BE MINDFUL BEFORE PURCHASING',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/9ce879/7125788793/il_fullxfull.7125788793_mp11.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 14,
      product_name: 'Three Cheers for Sweet Revenge Inspired Mismatch Earrings | Emo | Scene | Punk',
      description: 'Three Cheers for Sweet Revenge  Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat—  Size— 1.25 inch charms Super lightweight and a unique mismatch duo design.',
      price: 16.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/b57a1a/7223872527/il_fullxfull.7223872527_dkxu.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 15,
      product_name: 'Pentacle/ Pentagram Cord Necklace in Gold or Bronze |Pagan | Celtic Pagan | Witchcraft | Norse |',
      description: 'This is a simple charmed pentacle necklace with cord. This is made for anyone and its easy to wear with free shipping! Its lightweight and can be customized if you message us!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/8f2881/4455820841/il_fullxfull.4455820841_48ki.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 16,
      product_name: 'Whimsigoth Sun Auburn and Green Beaded Necklace with Leaf Accents in Silver| Celestial | Whimsitwee |',
      description: 'This necklace is semi stainless steel with beautiful green and auburn glass beads. Handmade and lightweight. Jewelry Care! Keep away from moisture and water to keep metal from tarnish 💚',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/539f2a/6890133850/il_fullxfull.6890133850_rlmr.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 17,
      product_name: 'Welcome to the Black Parade Inspired Keychain | Emo | Scene | Punk | MCR |',
      description: 'ONE KEYCHAIN PER PURCHASE— Welcome to the Back Parade Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat— Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/c2bcab/7020325588/il_fullxfull.7020325588_pmp6.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 18,
      product_name: 'Whimsigoth Brass Moon Pendant with 18k Gold Plated Heart Locket | Sodalite Beaded Necklace | Whimsitwee | Cottagecore',
      description: 'The mix of gold and blue is a perfect match for a whimsigoth style. Keep necklace away from moisture to retain the gorgeous gold color!  Heart Locket— 8mm  Length: 16-18 inches',
      price: 20.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/d3a0a4/7198404114/il_fullxfull.7198404114_9xfm.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 19,
      product_name: 'Whimsigoth Floral Pink Tulip Dangling Necklace 18k Gold Stainless Steel Plated | Fairycore | Cottagecore',
      description: 'This are chandelier style with an acrylic lily flower. This necklace is 18k gold stainless steel plated which means it is tarnish resistant! These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible and we take custom orders as well just message if interested.',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/a5a97d/5634882818/il_fullxfull.5634882818_qpx9.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 20,
      product_name: 'Whimsigoth Sodalite Crystal Heart Pendant Necklace with Stainless Steel Chain',
      description: 'Free shipping on orders over $35  This is our sodalite heart crystal necklace in silver tone. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  Length- 18"   The stone pendants are natural so each crystal varies in color and overall shape.',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/feb2df/5655271652/il_fullxfull.5655271652_klox.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 21,
      product_name: 'Whimsigoth Red Jasper Crystal Heart Pendant Necklace with Stainless Steel Chain',
      description: 'Free shipping on orders over $35  This is our Jasper heart crystal necklace in silver tone. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  Length- 18"   The stone pendants are natural so each crystal varies in color and overall shape.',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/e2f278/5703326819/il_fullxfull.5703326819_ejhi.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 22,
      product_name: 'Collide With The Sky Inspired cord Necklace | PTV | Pierce The Veil | Emo | Alternative Jewelry |',
      description: 'This is a cord necklace inspired by the Collide with the Sky album by Pierce The Veil. The silver and Black tones match the albums vibe seamlessly. Nickel free and ready to ship!  Necklace Length: 17-18 inches Charm Length— 2-2.75 Inches —The charm used is PLA 3D printed with a resin topcoat to keep it shiny— -EACH NECKLACE IS UNIQUE IN SHAPE AND COLOR DUE TO IT BEING HANDMADE! PLEASE BE MINDFUL BEFORE PURCHASING',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/4afb35/7125794125/il_fullxfull.7125794125_k6jq.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 23,
      product_name: 'Whimsigoth Songbird Beaded Necklace Choker in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind beaded necklace ! The auburn and green agate combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 15-16 inches',
      price: 21.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/8e667d/7087331755/il_fullxfull.7087331755_e18n.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 24,
      product_name: 'Collide With The Sky Inspired Beaded Keychain | Emo | Scene | Punk | PTV |',
      description: 'ONE KEYCHAIN PER PURCHASE— Pierce the Veil Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat— Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 14.55,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/df4d5f/7077864610/il_fullxfull.7077864610_hbby.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 25,
      product_name: 'Three Cheers for Sweet Revenge Inspired Magnetic Duo Cord Necklace | MCR | Friendship Necklace | Couples Jewelry |',
      description: 'Magnetic Duo Friendship/ Couples Necklace. This is a cord necklace inspired by the Welcome to the Black Parade album by Three Cheers for Sweet Revenge. The silver and Black tones match the albums vibe seamlessly. Nickel free and ready to ship!  Necklace Length: 17-18 inches Charm Length— 2.68-3 Inches —The charm used is PLA 3D printed with a resin topcoat to keep it shiny— -EACH NECKLACE IS UNIQUE IN SHAPE AND COLOR DUE TO IT BEING HANDMADE! PLEASE BE MINDFUL BEFORE PURCHASING',
      price: 30.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/53afc0/7241654077/il_fullxfull.7241654077_5i0l.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 26,
      product_name: 'Whimsigoth Fall Maple Leaves Mushroom Beaded Necklace in Bronze | Goblincore | Cottagecore |',
      description: 'This necklace is a beautiful mix of bronze metal and orange brown beads. The metal is bronze alloy so keep away from high moisture areas.  The necklace length is between 16-17 inches.',
      price: 24.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/0c5322/7039343356/il_fullxfull.7039343356_4i58.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 27,
      product_name: 'Whimsigoth Purple Trumpet Flower Chandelier Earrings | Goth | Whimsical | Fairycore | Grunge',
      description: 'These Earrings are lightweight and comfortable to wear. Gauged ear friendly 💚 Lever back earrings for comfortable fit.',
      price: 16.55,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/0c1c0f/6877182415/il_fullxfull.6877182415_i9ek.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 28,
      product_name: 'Whimsigoth Bronze Birdskull Floral Ankh Keychain | Whimsitwee | Gothic |',
      description: 'ONE KEYCHAIN PER PURCHASE— This keychain is designed for a whimsical addition to any bag or outfit. Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/019b3c/6912788508/il_fullxfull.6912788508_o5t2.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 29,
      product_name: 'Whimsigoth Bronze Maple Leaf Floral Keychain | Whimsitwee | Gothic |',
      description: 'ONE KEYCHAIN PER PURCHASE— This keychain is designed for a whimsical addition to any bag or outfit. Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/6a2907/6960779061/il_fullxfull.6960779061_nwho.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 30,
      product_name: 'Silver Angel Earrings | Fairy | Whimsigoth |',
      description: 'These Earrings are a beautiful mix of pearl and rose gold. They are lightweight and comfortable to wear. The earrings are made of rose gold alloy and are not tarnish resistant.',
      price: 6.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/124d6e/6278534269/il_fullxfull.6278534269_o11e.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 31,
      product_name: 'Three Cheers for Sweet Revenge Inspired Beaded Magnetic Duo Keychain | Emo | Scene | Punk',
      description: 'TWO KEYCHAIN PER PURCHASE— Three Cheers for Sweet Revenge  Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat—  Perfect duo gift for best friends, partners, siblings and etc. The magnetic keychain clicks together when they are paired.',
      price: 27.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/54cc2f/7221839817/il_fullxfull.7221839817_92o8.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 32,
      product_name: 'Whimsigoth | Witchcraft | Fairy | Crystal Amethyst Crescent Moon  Necklace in Bronze',
      description: 'This is a beautiful raw amethyst crystal dangling from a crescent moon. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  EACH AMETHYST STONE IS UNIQUE IN SHAPE AND COLOR— PLEASE BE MINDFUL NOT EVERY NECKLACE WILL BE IDENTICAL TO THE SAME AND COLOR OF THE IMAGE SHOWN—',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/7894bc/6547975609/il_fullxfull.6547975609_30nd.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 33,
      product_name: 'Whimsigoth Moon Burgundy Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind burgundy beaded necklace choker! The fed and bronze combination is beautifu. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-18 inches',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/23478a/6753768831/il_fullxfull.6753768831_el47.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 34,
      product_name: 'Whimsigoth Floral Lily of the Valley Flower Dangling 18k Gold Stainless Steel Plated Earrings  | Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with an acrylic lily flower. These earrings are 18k gold stainless steel plated These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible and we take custom orders as well just message if interested.',
      price: 16.95,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/da4c7d/5424875553/il_fullxfull.5424875553_2hv1.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 35,
      product_name: 'Bronze claddagh pendent beaded necklace/ Celtic chariot exclusive / dark green -Auburn Beaded necklace /celticore / Celtic jewelry',
      description: 'This is a Celtic chariot exclusive design featuring our bronze Claddagh - handmade and created.  Only high quality beads used in colors of rich auburn , dark green , champagne and bronze beads- this is a beaded necklace choker! The brown - green and bronze combination is beautiful. This necklace is unique with quick shipping!  Each necklace may  have different unique color variations and sizes -  Around 16-17 inches  we can make any length just add in notes At checkout!',
      price: 18.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/15c600/6952171530/il_fullxfull.6952171530_m9sb.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 36,
      product_name: 'Whimsigoth Purple Trumpet Flower Beaded Necklace in Bronze| Fairycore | Gothic | naturalist |',
      description: 'Option to add earrings …  This is a one of a kind trumpet flower beaded necklace! The trumpet flower is an acrylic material and the beads are acrylic as well.  Keep away from moisture! Length: 17-18in',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/0b8aac/6829475420/il_fullxfull.6829475420_215o.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 37,
      product_name: 'Boho mixed beads, 50 piece set, 3 styles of beads in neutral  tones for jewelry making/ beaded necklace bracelet beads diy',
      description: 'Mixed bead set in neutral tones, browns and tan beads for a diy crafter. Beads include 3 styles of  50 total mixed beads.   - 50 piece set - 3 design styles   - heart rounded bead ,  tribal  oblong beads,  and wood inspired filler design beads for jewelry making/ beaded necklace bracelet beads diy',
      price: 3.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/62be7e/6597406843/il_fullxfull.6597406843_repd.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 38,
      product_name: 'Three Cheers for Sweet Revenge Inspired Duo Keychain | Emo | Scene | Punk',
      description: 'TWO KEYCHAIN PER PURCHASE— **NOT MAGNETIC STANDARD KEYCHAIN***   Three Cheers for Sweet Revenge  Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat—  Perfect duo gift for best friends, partners, siblings and etc.',
      price: 21.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/25b65d/7174275442/il_fullxfull.7174275442_10ug.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 39,
      product_name: 'Whimsigoth Bronze Sun Deep Auburn Beaded Necklace | Celestial | Whimsical | Vampy Goth |',
      description: 'This necklace is nickel free bronze with beautiful auburn and champagne glass beads. Handmade and lightweight. Jewelry Care! Keep away from moisture and water to keep metal from tarnish 💚',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/7d3f2c/6891336812/il_fullxfull.6891336812_ng4n.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 40,
      product_name: 'Victorian Hummingbird Auburn Trumpet Flower Beaded Necklace in Bronze| Fairycore | Whimsigoth | Whimsitwee |',
      description: 'This is a one of a kind trumpet flower beaded necklace! The trumpet flower is an acrylic material and the beads are acrylic as well.  Keep away from moisture! Length: 15-16in',
      price: 25.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/1319d1/7023761955/il_fullxfull.7023761955_17rs.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 41,
      product_name: 'Brass Hand Heart Locket Floral 18k Gold Plated Necklace | Whimsitwee | Whimsigoth | Cottagecore',
      description: 'This necklace is the perfect piece for any loving photo. Pictures of your partner or pet are perfect additions to this heart locket. It is lightweight and semi stainless steel which means the pendant itself is made of a brass while the chain is 18k gold stainless steel.',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/08c4b2/7178069036/il_fullxfull.7178069036_ltfw.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 42,
      product_name: 'Moon Trinity Pentacle earrings-witchcraft jewelry/ pagan/ Celtic/ celestial / tree of life',
      description: 'Pentacle tree of life moon trinity earrings in silver tones as drop earrings-',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/6715d5/5010085534/il_fullxfull.5010085534_3aem.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 43,
      product_name: 'Whimsigoth Bohemian Flower Fall Earrings in Bronze | Fairycore | Whimsical',
      description: 'ONE PAIR ! These are dangling simple and light weigh flowerearrings bronze tones- Resin Floral Pendant   Perfect for any day wear or a special occasion.',
      price: 10.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/8836cb/6768356675/il_fullxfull.6768356675_qvfu.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 44,
      product_name: 'Whimsigoth Dragonfly Floral Green  Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind green and iridescent beaded bronze necklace choker! The beaded design and bronze combination is beautiful. Necklace is complete with our popular dragonfly pendent charm-This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 15.5-17 inches',
      price: 18.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/90d607/6885722776/il_fullxfull.6885722776_cmm2.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 45,
      product_name: 'Whimsigoth Green Floral  Dragonfly Flower Dangling Earrings in Bronze| Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with an acrylic lily flower. These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible.',
      price: 15.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/641bb5/6932037585/il_fullxfull.6932037585_j6x3.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 46,
      product_name: 'Whimsitwee Bronze Auburn Flower Cord Necklace | Cottagecore | Whimsigoth | Bohemian',
      description: 'ONLY ONE NECKLACE— This necklace is perfect for anyone! Super lightweight and  resin flower with a bronze pendant!',
      price: 13.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/24b5b8/6734031816/il_fullxfull.6734031816_j1pu.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 47,
      product_name: 'Welcome to the Black Parade Inspired Silver and Black cord Necklace | MCR | Emo | Alternative Jewelry |',
      description: 'This is a cord necklace inspired by the Welcome to the Black Parade album by My Chemical Romance. The silver and Black tones match the albums vibe seamlessly. Nickel free and ready to ship!  Necklace Length: 17-18 inches Charm Length— 2.68-3 Inches —The charm used is PLA 3D printed with a resin topcoat to keep it shiny— -EACH NECKLACE IS UNIQUE IN SHAPE AND COLOR DUE TO IT BEING HANDMADE! PLEASE BE MINDFUL BEFORE PURCHASING',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/9481a3/7068299767/il_fullxfull.7068299767_jqr2.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 48,
      product_name: 'Natural Butterfly Beaded necklace in Bronze | Fairycore | Whimsigoth | naturalist |',
      description: 'This is a one of a kind beaded necklace choker! The beaded design and bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 15.5-17 inches',
      price: 18.85,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/dc7a10/6798948964/il_fullxfull.6798948964_gwhl.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 49,
      product_name: 'Whimsigoth Black Trumpet Flower Chandelier Earrings | Goth | Whimsical | Fairycore | Grunge',
      description: 'These Earrings are lightweight and comfortable to wear. Gauged ear friendly 💚 Lever back earrings for comfortable fit.',
      price: 16.95,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/157621/6587688795/il_fullxfull.6587688795_mb6q.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 50,
      product_name: 'Gothic Hand Baphomet Sword Necklace in bronze | Whimsigoth | Goth | Grunge',
      description: 'This is a one of a kind hand sword beaded necklace ! The green and Bronze combination is super dynamic and pretty. This necklace is handmade and quick shipping! Please be mindful of tarnishing and keep away from moisture!  Each necklace will have different unique color variations and sizes - Around 19-20 inches',
      price: 18.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/210cc0/6960795783/il_fullxfull.6960795783_aadj.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 51,
      product_name: 'bohemian beads, 50 piece set, sun design beads for jewelry making/ beaded necklace bracelet beads diy',
      description: 'Resin sun beads— boho inspired design, wood look but resin beads for a diy crafter. Beads include 50 of the same bead.   - 50 piece set  - sun with happy face design /  beads for jewelry making/ beaded necklace bracelet beads diy',
      price: 5.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/5d3c3a/6549275174/il_fullxfull.6549275174_aq8f.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 52,
      product_name: 'bohemian beads, 50 piece set, daisy design beads for jewelry making/ beaded necklace bracelet beads diy',
      description: 'bohemian beads for a diy crafter. Beads include 50 of the same bead.   - 50 piece set  - daisy design beads for jewelry making/ beaded necklace bracelet beads diy',
      price: 3.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/748ff7/6549155718/il_fullxfull.6549155718_iqiz.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 53,
      product_name: 'Whimsigoth Dragonfly Auburn & Deep Green Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind auburn beaded necklace choker! The beaded design and bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 17 inches',
      price: 18.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/9ac460/6753778665/il_fullxfull.6753778665_s3lk.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 54,
      product_name: 'Gothic Bronze Bat Keychain with  Brown Accents| Whimsitwee | Gothic |',
      description: 'ONE KEYCHAIN PER PURCHASE— This keychain is designed for a whimsical addition to any bag or outfit. Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/543eb0/7156602248/il_fullxfull.7156602248_nc9c.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 55,
      product_name: 'Gothic Bronze Ghost Keychain with Burgundy and Brown Accents| Whimsitwee | Gothic |',
      description: 'ONE KEYCHAIN PER PURCHASE— This keychain is designed for a whimsical addition to any bag or outfit. Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/dcc45c/7204590743/il_fullxfull.7204590743_phmt.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 56,
      product_name: 'Whimsigoth Auburn and Aqua Floral Dragonfly Beaded necklace in Bronze | Fairycore | Whimsicle | Whimsitwee |',
      description: 'This is a one of a kind auburn and aqua beaded necklace choker! The beaded design and bronze combination is beautiful. This necklace is handmade and quick shipping!  —Nickel Free Alloy Bronze Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 28.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/2b958e/7039151403/il_fullxfull.7039151403_pnhu.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 57,
      product_name: 'Bronze Heart Pendant Beaded Necklace in Auburn | Gothic |Whimsigoth | Artsy | Alternative',
      description: 'This necklace is a perfect piece to pair either on its own or with our other pieces. It is lightweight and comfortable. The bronze and burgundy colors match perfectly to make an elegant appearance.  16-18 inches in length',
      price: 16.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/d54f60/6898210391/il_fullxfull.6898210391_7pzd.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 58,
      product_name: 'Whimsigoth Dragonfly Aqua Terra Jasper Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind blue terra Jasper beaded necklace choker! The natural Jasper and bronze combination is beautifu. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/03eb89/6917571620/il_fullxfull.6917571620_biqu.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 59,
      product_name: 'Whimsigoth Dragonfly green  Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind green and iridescent beaded bronze necklace choker! The beaded design and bronze combination is beautiful. Necklace is complete with our popular dragonfly pendent charm-This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 15.5-17 inches',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/924988/7145314055/il_fullxfull.7145314055_glp4.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 60,
      product_name: 'Whimsigoth Bronze Sun and Moon Keychain with Golden Iridescent Accents| Whimsitwee | Gothic |',
      description: 'ONE KEYCHAIN PER PURCHASE— This keychain is designed for a whimsical addition to any bag or outfit. Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/e4cb3d/6960781505/il_fullxfull.6960781505_cf7k.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 61,
      product_name: 'Gothic Hand Baphomet Sword Necklace in Silver Alloy | Whimsigoth | Goth | Grunge',
      description: 'This is a one of a kind hand sword beaded necklace ! The brown and silver combination is super dynamic and pretty. This necklace is handmade and quick shipping! This is a stainless chain but the charms are a nickel free alloy so please be mindful of tarnishing and keep away from moisture!  Each necklace will have different unique color variations and sizes - Around 19-21 inches',
      price: 20.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/39ec26/6960793823/il_fullxfull.6960793823_tlis.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 62,
      product_name: 'Fairy Iridescent Aura Beaded Earrings with Star charms | Fairycore | Whimsigoth | Goblincore',
      description: 'These are a dangling style silver toned earrings that are made with light weight acrylic beads and star pendants. Easy to wear and fast shipping!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/d08ece/5852632971/il_fullxfull.5852632971_5sbs.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 63,
      product_name: 'Ankh earrings- large size- available in bronze gold or silver',
      description: 'Large Ankh pendent dangling earrings with lever back clasps. We offer bronze gold or silver.  The ankh symbol is from ancient Egyptian culture and thought of as " the key of life " and represents eternal life. Symbol of healing properties and associated with strength and prosperity, the ankh is said to be the first--or original--cross.  Ready to ship —',
      price: 12.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/5b951a/3998501220/il_fullxfull.3998501220_iv7u.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 64,
      product_name: 'Whimsigoth Bronze Floral Lily of the Valley Chandelier Necklace | Whimsical | Floral Jewelry |',
      description: 'Lily of the valley bronze necklace! Beautiful combination of bronze and pearl!  Keep away from high moisture areas  Length 17-18in',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/9000ec/6609277091/il_fullxfull.6609277091_1q1n.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 65,
      product_name: 'Whimsitwee Bouquet Lily of the Valley Flower Dangling Chandilier Earrings in 18k Gold Plated Stainless Steel | Fairycore | Cottagecore',
      description: 'These dangling earrings are chandelier style with an acrylic lily flower.  18k Gold Plated Stainless Steel— Perfect for any day wear or a special occasion. We ship as fast as possible and we take custom orders as well just message if interested.',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/19dac9/6962590602/il_fullxfull.6962590602_5lj2.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 66,
      product_name: 'Whimsitwee Red Floral Tulip Earrings in Bronze/Gold/Silver | Fairycore | Whimsigoth',
      description: 'These are dangling simple and light weigh maple  earrings in gold tones, silver tones, bronze tones-  Perfect for any day wear or a special occasion.',
      price: 9.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/967591/6753788016/il_fullxfull.6753788016_7xg1.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 67,
      product_name: 'Misadventures Inspired Silver and Red Beaded Necklace | PTV | Emo | Alternative Jewelry |',
      description: 'This is a beaded necklace inspired by the Misadventures album by Pierce the Veil. The silver and red tones match the albums vibe seamlessly. Nickel free and ready to ship!  Length: 15-17 inches',
      price: 22.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/603fe9/6217923383/il_fullxfull.6217923383_q74a.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 68,
      product_name: 'Whimsigoth Auburn Sun and Moon Beaded Belt in Bronze | Chain Belt | Renaissance | Whimsitwee',
      description: 'This is a beaded belt, perfect to accessorize any outfit. The chain is super lightweight and flowy. Instead of being made from solid leather or fabric, its constructed with beads and chain. It can be worn at the waist or hips—sometimes even loosely draped over dresses, tunics, or jeans as an accessory rather than a functional belt.  Length-- 3ft-- Size is adjustable to make smaller  (Can be altered to a bigger size)',
      price: 36.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/9763d1/7135439290/il_fullxfull.7135439290_sumh.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 69,
      product_name: 'Strawberry Shortcake Inspired Beaded Necklace with Strawberry Photo Locket | Cottagecore | Whimsitwee | Fairycore',
      description: 'This necklace is a beautiful combination of Pink, Green and Gold. It is lightweight and comfortable to wear. The locket is between 1-1.10inchs long and wide.   — Pictures of loved ones or pets are a great addition to this piece.   —The material used for this piece is nickel free alloy and 18k Gold Stainless steel chain so be mindful to tarnishing and keep away from high moisture areas. Length: 16-17 inches',
      price: 25.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/f04cea/6991166636/il_fullxfull.6991166636_mqdx.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 70,
      product_name: 'Whimsigoth Dragonfly Auburn Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind auburn beaded necklace choker! The beaded design and bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 17 inches',
      price: 17.89,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/3feb5f/6462412914/il_fullxfull.6462412914_p3qv.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 71,
      product_name: 'Whimsigoth Sun Pendant Earrings in gold | Fairycore | Whimsical',
      description: 'These are dangling simple and light weigh sun charms earrings in gold tones-  Perfect for any day wear or a special occasion.',
      price: 9.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/a1011b/5639336145/il_fullxfull.5639336145_p863.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 72,
      product_name: 'Whimsitwee Silver Dragonfly Floral  Keychain | Cottagecore | Goblincore |',
      description: 'ONE KEYCHAIN PER PURCHASE— This keychain is designed for a whimsical addition to any bag or outfit. Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 12.95,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/cca323/7053025383/il_fullxfull.7053025383_fh8b.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 73,
      product_name: 'Whimsitwee Dragonfly Aquamarine Beaded necklace in Silver | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind Aquamarine  beaded necklace choker! The beaded design and silver combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/fdbe1c/6987109762/il_fullxfull.6987109762_sxnx.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 74,
      product_name: 'Whimsigoth | Witchcraft | Fairy | Crystal Amethyst Crescent Moon  Necklace in Bronze',
      description: 'This is a beautiful raw amethyst crystal dangling from a crescent moon. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  EACH AMETHYST STONE IS UNIQUE IN SHAPE AND COLOR— PLEASE BE MINDFUL NOT EVERY NECKLACE WILL BE IDENTICAL TO THE SAME AND COLOR OF THE IMAGE SHOWN—',
      price: 14.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/c39b79/6547966411/il_fullxfull.6547966411_joz9.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 75,
      product_name: 'Whimsigoth Bohemian Maple Leaf Coffee Bean Fall Earrings in Bronze | Fairycore | Whimsical',
      description: 'These are dangling simple and light weigh maple leaf earrings bronze tones- Resin Beads   Perfect for any day wear or a special occasion.',
      price: 12.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/786d07/7042316666/il_fullxfull.7042316666_sf5c.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 76,
      product_name: 'Whimsigoth Maple Leaf Fall Earrings in Bronze | Fairycore | Whimsical',
      description: 'These are dangling simple and light weigh maple  earrings in bronze tones-  Perfect for any day wear or a special occasion.',
      price: 9.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/02d03e/6884517950/il_fullxfull.6884517950_k9j0.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 77,
      product_name: 'SALE Evil Eye crystal necklace in silver tone | statement piece| witchcraft jewelry |Wicca | Pagan',
      description: 'This hand crafted wire wrapped purple agate crystal necklace is paired as a dangling duo beautifully accented with a large size evil eye / Horus charm and 2 mini stars - such a fun and unique design. Silver tones!  Ready to ship',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/6a7145/4662166340/il_fullxfull.4662166340_j3o2.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 78,
      product_name: 'Whimsigoth Bronze Sun Deep Green Beaded Necklace with Star Accents | Celestial | Whimsical | Vampy Goth |',
      description: 'This necklace is nickel free bronze with beautiful green and champagne glass beads. Handmade and lightweight. Jewelry Care! Keep away from moisture and water to keep metal from tarnish 💚',
      price: 18.95,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/86c5aa/6553808066/il_fullxfull.6553808066_efxb.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 79,
      product_name: 'Celestial Sun moon crescent amethyst crystal necklace with stainless steel chain | Pagan | Witchcraft | Fairy',
      description: 'This is our sun- moon- crescent amethyst crystal necklace in silver tone. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  Length- 18"  Amethyst is Known as "the all purpose stone", Amethyst is a protective stone that helps to relieve stress and anxiety in your life, and the symptoms that accompany it, namely headaches, fatigues, and anxiety. It also aids in cell regeneration (supporting your bones and joints) and is reputed to improve your skin.',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/c4f8bc/5511365157/il_fullxfull.5511365157_mobd.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 80,
      product_name: 'Handmade Pentacle Moon Trinity Earrings',
      description: 'This is a handmade moon trinity earring, simple wear yet dainty on the ear. Very light weight and easy to wear on the ear. Its not heavy and it doesnt tug and pull on the ear.',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/16b59a/3749922124/il_fullxfull.3749922124_d5ar.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 81,
      product_name: 'Pentacle Moon Trinity Earrings… Wicca jewelry',
      description: 'This is a handmade moon trinity dangling earring, simple wear yet dainty on the ear. A perfect silver tone  earring duo that pairs perfectly with other jewelry or as a stand alone. Very light weight and easy to wear on the ear. Its not heavy and it doesnt tug and pull on the ear.  Ready to ship- fast ship   Custom orders welcome',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/fbf97f/3749918788/il_fullxfull.3749918788_crdq.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 82,
      product_name: 'Whimsitwee Bronze Auburn Flower Beaded Necklace | Cottagecore | Whimsigoth | Bohemian',
      description: 'This necklace is perfect for anyone! Super lightweight and has a resin flower pendant  The necklace is nickel free alloy so please keep away from any type of moisture! Length— 16-17in',
      price: 16.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/a151af/6975774708/il_fullxfull.6975774708_ic3q.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 83,
      product_name: 'Amethyst Crystal Beaded Necklace Choker with Sun Pendant in Bronze | Fairycore | Whimsigoth | Wicca |',
      description: 'NATURAL STONE BEADS COLORS MAY VARY —  This is a one of a kind amethyst beaded necklace choker! The purple and bronze combination is beautiful. This necklace is handmade and quick shipping!',
      price: 22.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/f0aecc/7149023797/il_fullxfull.7149023797_tj6j.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 84,
      product_name: 'Misadventures Inspired O Ring Keychain | Emo | Scene | PTV',
      description: 'ONE KEYCHAIN PER PURCHASE— Pierce the Veil Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat— Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/85e461/7101052356/il_fullxfull.7101052356_lc30.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 85,
      product_name: 'Misadventures Inspired Beaded Keychain | Emo | Scene | Punk | PTV |',
      description: 'ONE KEYCHAIN PER PURCHASE— Pierce the Veil Inspired Keychain— —Charm Material: PLA 3D Printed Resin Top Coat— Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 15.55,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/6204f6/7101047150/il_fullxfull.7101047150_kfpy.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 86,
      product_name: 'Whimsigoth Floral Daisy Flower Dangling Necklace in 18k Gold Plated Stainless Steel | Fairycore | Cottagecore',
      description: 'This necklace is a chandelier style with an acrylic daisy flower.  The necklace is 18k gold plated stainlesss steel which means these earrings are tarnish resistant and heavy duty!   These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible.',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/242bba/5546391123/il_fullxfull.5546391123_iwbb.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 87,
      product_name: 'Fairy Pearl Beaded Earrings with Butterfly charms | Fairycore | Whimsigoth | Goblincore',
      description: 'These are a dangling style silver toned earrings that are accented with beads. Easy to wear and fast shipping!',
      price: 10.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/79cd09/4811794311/il_fullxfull.4811794311_8yie.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 88,
      product_name: 'Bronze Sun and Moon Beaded Necklace with Black Bead Accents | Whimsigoth | Gothic |',
      description: 'This beaded necklace is a perfect blend of bronze and black beads. The sun and moon charms complement the necklace perfectly. This piece is lightweight and comfortable.  16-18 inches',
      price: 18.88,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/f6ff8c/6753772387/il_fullxfull.6753772387_ayp8.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 89,
      product_name: 'Gothic Floral Barbed Wire Ankh Beaded Necklace in Silver | Whimsigoth | Victorian |',
      description: 'This is a one of a kind  beaded necklace choker! The black and silver combination is beautiful with spiders to accent it. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 22.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/686937/7015530309/il_fullxfull.7015530309_p5p0.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 90,
      product_name: 'Bronze beaded Auburn brown and champagne sun, stars and moon necklace | Celestial | Whimsical | Vampy Goth |',
      description: 'This necklace is nickel free bronze with beautiful auburn and champagne glass beads in cut glass, crescent moons and star with bronze beads and bronze stars. Handmade and lightweight.     Jewelry Care! Keep away from moisture and water to keep metal from tarnish 💚',
      price: 17.25,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/b6493a/7085010687/il_fullxfull.7085010687_fslm.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 91,
      product_name: 'Victorian Red Trumpet Flower Chandelier Beaded Necklace in Bronze| Fairycore | Whimsigoth | Whimsitwee |',
      description: 'This is a one of a kind trumpet flower beaded necklace! The trumpet flower is an acrylic material and the beads are acrylic as well.  Keep away from moisture! Length: 16-17in',
      price: 24.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/b4eabb/6967048304/il_fullxfull.6967048304_lmt6.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 92,
      product_name: 'CLEARANCE— Goth Skull Blood drop Beaded Necklace in Bronze| Grunge | Whimsigoth | Gothic |',
      description: 'This is a one of a kind skull beaded necklace! The black and bronze combination is beautiful with bone toned mini skull beads to accent. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 11.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/e8c3b1/6482524018/il_fullxfull.6482524018_dpim.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 93,
      product_name: 'Fairy Bronze Mushroom Earrings | Fairycore | Whimsigoth | Goblincore',
      description: 'These are a dangling style bronze mushroom earrings are perfect with anything! Easy to wear and fast shipping!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bc0547/4637187818/il_fullxfull.4637187818_7sxp.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 94,
      product_name: 'Whimsigoth Bronze Golden Lily of the Valley Keychain| Whimsitwee | Gothic |',
      description: 'ONE KEYCHAIN PER PURCHASE— This keychain is designed for a whimsical addition to any bag or outfit. Spice up business casual badges by adding a touch of whimsy. Add this piece to Backpacks, Purses, Work Badges, Jean Loops, Belts and many more!!',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bef27a/6960783557/il_fullxfull.6960783557_8oth.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 95,
      product_name: 'Whimsical Beaded Necklace Choker with Sun and Moon Pendant in Bronze | Fairycore | Whimsigoth | Wicca |',
      description: 'Length— 16-17in   This is a one of a kind beaded necklace choker! The purple and bronze combination is beautiful. This necklace is handmade and quick shipping!',
      price: 20.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/cb8b22/6661504994/il_fullxfull.6661504994_idqz.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 96,
      product_name: 'Whimsigoth Auburn Sun Beaded Bracelet in Bronze | Cottagecore | Whimsitwee',
      description: 'This beaded bracelet is matching with one of our most popular beaded necklace. The Auburn and bronze is a unique combination of colors. Nickel free alloy.  Length— 8in plus extender',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/992867/7126390947/il_fullxfull.7126390947_6rm6.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 97,
      product_name: 'Whimsigoth Amethyst Crystal Heart Pendant Necklace with Stainless Steel Chain',
      description: 'Free shipping on orders over $35  This is our amethyst heart crystal necklace in silver tone. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  Length- 18"   The stone pendants are natural so each crystal varies in color and overall shape.',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/806b46/5655261742/il_fullxfull.5655261742_1bd4.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 98,
      product_name: 'Celestial star round beads, 50 piece set, star design in neutral tones , beads for jewelry making/ beaded necklace bracelet beads diy',
      description: 'celestial star design round beads in boho inspired design, wood look but resin beads for a diy crafter. neutral toned,  Beads include 50 of the same bead.   - 50 piece set  - round beads with multiple star designs /  beads for jewelry making/ beaded necklace bracelet beads diy',
      price: 3.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/5463ef/6549302116/il_fullxfull.6549302116_j0dv.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 99,
      product_name: 'Fairy Butterfly Blue Iridescent Beaded Necklace in Bronze| Fairycore | Whimsigoth | naturalist |',
      description: 'This is a one of a kind butterfly beaded necklace! These iridescent blue beads and the bronze combination is beautiful. This necklace is handmade and quick shipping!  Length: 16-17in',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/2f31dc/6960789503/il_fullxfull.6960789503_lg8k.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 100,
      product_name: 'Whimsical Champange Beaded Choker with Stars and Moon Pendant in Bronze | Fairycore | Whimsigoth | Wicca |',
      description: 'All orders over 35 dollars get free shipping!   This is a one of a kind beaded necklace choker! The purple and bronze combination is beautiful. This necklace is handmade and quick shipping!',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/55cc14/6806297187/il_fullxfull.6806297187_idtq.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 101,
      product_name: 'Whimsigoth Daisy Humming Bird Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind beaded necklace ! The auburn and bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 17-19 inches',
      price: 17.89,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/23dd3b/6781936665/il_fullxfull.6781936665_bb1n.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 102,
      product_name: 'Bronze Goddess Moon Trinity Pentacle Dangling Earrings',
      description: 'This is a handmade moon trinity earring, simple wear yet dainty on the ear. Very light weight and easy to wear on the ear. Its not heavy and it doesnt tug and pull on the ear.',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/f1e710/3671483309/il_fullxfull.3671483309_2er3.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 103,
      product_name: 'Genuine Tigereye Crystal Beaded Necklace in Gold | Fairycore | Whimsigoth | Cottagecore |',
      description: 'This is a one of a kind Tigereye heart beaded necklace! The Brown and Gold combination is beautiful -This necklace is handmade and quick shipping! This also comes with a heart clasp! 17-18 in length  WARNING! The tigereye beads AND pendant are natural stones. This means that they very in shape, size and color. Please be mindful of this before purchasing!',
      price: 18.95,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bc96da/7103536957/il_fullxfull.7103536957_pkxk.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 104,
      product_name: 'Pagan Pentagram Moon Trinity Auburn Foral Beaded Necklace in Bronze | Fairycore | Whimsigoth | Wicca |',
      description: 'This is a one of a pentagram beaded necklace! The green and bronze combination is beautiful with a gold pentagram pendent -This necklace is handmade and quick shipping!  16 in-17 in length',
      price: 18.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/7eeb15/7055555194/il_fullxfull.7055555194_dc4i.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 105,
      product_name: 'Celtic | Viking | Bronze Arrow Head Brown Cord Necklace',
      description: 'This necklace is perfect for anyone! The natural raw agate arrow head wears easy on the neck with the black cord necklace. Easy to wear and Fast shipping!',
      price: 10.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/43aaa4/6642477568/il_fullxfull.6642477568_2oie.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 106,
      product_name: 'Whimsigoth Maple Leaf Fall Earrings in Bronze/Gold | Fairycore | Whimsical',
      description: 'These are dangling simple and light weigh maple  earrings in gold tones or bronze tones-  — Made with Acrylic Beads 🍂 Perfect for any day wear or a special occasion.',
      price: 12.3,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/b8f916/6649347869/il_fullxfull.6649347869_fsms.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 107,
      product_name: 'Gothic Grunge Chandelier Bat  Earrings in Silver and Clear Quartz | Goth | Whimsical',
      description: 'These dangling earrings are chandelier style with accented auburn beads in silver.  Perfect for any day wear or a special occasion. We ship as fast as possible and these are made of a nickel free alloy so be mindful of tarnishing if exposed to moisture.  ( DUE TO THE CRYSTAL THESE  EARRINGS ARE SLIGHTLY HEAVIER THAN A STANDARD PAIR OF CHANDLER EARRINGS PLEASE BE MINDFUL BEFORE PURCHASING 💚)',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/ed450e/5905434639/il_fullxfull.5905434639_roqj.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 108,
      product_name: 'Whimsigoth Hummingbird Floral Daisy Earrings | Naturalist | Gift for mom |',
      description: 'These Earrings are a beautiful mix of green bronze and white. They are lightweight and easy to wear. Avoid any areas that are high moisture to keep the necklace from tarnishing.',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/e54d65/6461963493/il_fullxfull.6461963493_sndg.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 109,
      product_name: 'Whimsigoth Bloodstone Crystal Heart Pendant Necklace with Stainless Steel Chain',
      description: 'PRODUCT CONTAINS ONE NECKLACE! PHOTO IS TO SHOW THE COLOR VARIANTS OF THE NATURAL STONE :)—  This is our bloodstone heart crystal necklace in silver tone. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  Length- 18"   The stone pendants are natural so each crystal varies in color and overall shape.',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/40bc62/6664056199/il_fullxfull.6664056199_gfps.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 110,
      product_name: 'Gothic Red Blood Drop Ankh Beaded Necklace with Bronze | Whimsigoth | Victorian |',
      description: 'This is a one of a kind  beaded necklace choker! The red and bronze combination is beautiful with moons to accent it. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 16.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bc9fae/6606504512/il_fullxfull.6606504512_6ejn.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 111,
      product_name: 'Whimsigoth Clear Quartz Crystal Heart Pendant Necklace with Stainless Steel Chain',
      description: 'Free shipping on orders over $35  This is our clear quartz heart crystal necklace in silver tone. Its a pendant style necklace perfect for spiritual individual or someone who loves astrology. Easy to wear and quick shipping!  Length- 18"   The stone pendants are natural so each charm varies in color and overall shape.',
      price: 14.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/81e570/5511395287/il_fullxfull.5511395287_eig8.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 112,
      product_name: 'Gothic Style Tiered Moonstone Crystal Beaded Necklace in Silver | Whimsigoth | Victorian |',
      description: 'This is a one of a kind tiered beaded necklace choker! The black and silver combination is beautiful with moonstone to accent it. This necklace is handmade and quick shipping! The chain is stainless steel while the pendant is a nickel free alloy.  Each necklace will have different unique color variations and sizes - Around 16-17 inches',
      price: 13.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/2453e1/5675858348/il_fullxfull.5675858348_h5m5.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 113,
      product_name: 'Romantic Goth Pendant Locket Beaded Necklace in Silver | Gothic | Whimsigoth | Alternative Jewelry',
      description: 'This necklace is a beautiful combination of silver, mauve and black resin beads. It is lightweight and comfortable to wear. — The locket is between 0.5-0.75in long. Any photo fits perfectly in this necklace.  — Pictures of loved ones or pets are a great addition to this piece.  The material is a nickel free alloy and a stainless steel chain so be mindful to tarnishing and keep away from high moisture areas. Length: 16-17 inches',
      price: 23.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/1c93d0/6991179794/il_fullxfull.6991179794_lc3y.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 114,
      product_name: 'Raw Crystal Amazonite Crescent Moon Necklace in Gold |fairy jewelry | cottagecore necklace |goblin core | whimsigoth',
      description: 'Our unique raw amazonite crescent moon necklace is a lightweight necklace- gold tones a perfect layering necklace or as s stand alone style.   Length 18"  Ready to ship',
      price: 7.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bbdd2d/5511334627/il_fullxfull.5511334627_881x.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 115,
      product_name: 'Whimsigoth Mushroom Beaded Necklace in Gold | Goblincore | Cottagecore |',
      description: 'This necklace is a beautiful mix of gold metal and red beads. The metal is gold plated stainless steel and nickel free alloy so keep away from high moisture areas. The necklace length is between 16-17 inches.',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/eb8303/7039209849/il_fullxfull.7039209849_dh53.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 116,
      product_name: 'Deep Green and Gold Celtic Triquetra Beaded Necklace in Silver | Fairycore | Whimsigoth | Wicca |',
      description: 'This is a one of a kind celtic beaded choker necklace! The Green and Gold combination is beautiful celtic pendent and moon charm accents -This necklace is handmade and quick shipping!    — Nickel Free Alloy  16- 17in length ( adjustable)',
      price: 20.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/4553df/7039127905/il_fullxfull.7039127905_1xel.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 117,
      product_name: 'Oceanic Sun Auburn & Blue Glass Beaded necklace in Bronze | | Whimsicle | naturalist | Oceancore',
      description: 'This is a one of a kind auburn beaded necklace choker! The beaded design and bronze combination is beautiful. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 17 inches',
      price: 18.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/0d3d77/6961778080/il_fullxfull.6961778080_fhhc.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 118,
      product_name: 'Bronze Heart Pendant Beaded Necklace in Burgundy | Gothic |Whimsigoth | Artsy | Alternative',
      description: 'This necklace is a perfect piece to pair either on its own or with our other pieces. It is lightweight and comfortable. The bronze and burgundy colors match perfectly to make an elegant appearance.  16-18 inches in length',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/a24fec/6095040368/il_fullxfull.6095040368_tm0x.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 119,
      product_name: 'Moon Trinity Pentacle earrings-witchcraft jewelry/ pagan/ Celtic/ celestial / tree of life',
      description: 'Pentacle tree of life moon trinity earrings in silver tones as drop earrings-',
      price: 10.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/fdc8da/5066434725/il_fullxfull.5066434725_ekxi.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 120,
      product_name: 'Dainty mini Ankh bronze and emerald green beaded dangling earrings- small and dainty -',
      description: 'Dangling emerald green cut glass beaded bronze with mini 1/2 inch Ankh charm dangling earrings with lever back clasps.  earrings are 2 in length and ankh charm dainty sized at 1/2 .   The ankh symbol is from ancient Egyptian culture and thought of as " the key of life " and represents eternal life. Symbol of healing properties and associated with strength and prosperity, the ankh is said to be the first--or original--cross.  Ready to ship — with fast shipping',
      price: 12.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/48fe01/6967608032/il_fullxfull.6967608032_bari.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 121,
      product_name: 'Whimsitwee Bronze green Flower Cord Necklace | Cottagecore | Whimsigoth | Bohemian',
      description: 'This dainty flower pendant necklace is a light mossy green sheer color with bronze accent beads-  necklace is perfect for anyone! Super lightweight and  Easy to wear or pair with other jewelry ! PLUS Fast shipping',
      price: 13.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bc7b8f/6967500364/il_fullxfull.6967500364_jf2l.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 122,
      product_name: 'Whimsigoth Floral Lily of the Valley Flower Dangling Rose Gold Earrings  | Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with an acrylic lily flower.  These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible and we take custom orders as well just message if interested.',
      price: 15.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/fca56e/5775821086/il_fullxfull.5775821086_hnr1.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 123,
      product_name: 'Whimsitwee Lily of the Valley Flower Dangling Chandelier Earrings in 18k Gold Plated Stainless Steel | Fairycore | Cottagecore',
      description: 'These dangling earrings are chandelier style with an acrylic lily flower.  18k Gold Plated Stainless Steel— Perfect for any day wear or a special occasion. We ship as fast as possible and we take custom orders as well just message if interested.',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/beb784/6962596314/il_fullxfull.6962596314_tk70.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 124,
      product_name: 'Ankh necklace in silver tones on black cord necklace',
      description: 'Silver Ankh pendent on a black  cord necklace-  The ankh symbol is from ancient Egyptian culture and thought of as " the key of life " and represents eternal life. Symbol of healing properties and associated with strength and prosperity, the ankh is said to be the first--or original--cross.  Ready to ship — also available in bronze',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/42655d/4009636345/il_fullxfull.4009636345_pb1b.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 125,
      product_name: 'Whimsigoth Mushroom Green Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind mushroom beaded necklace! The green and bronze combination is beautifu. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 17-18 inches',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/28f0dd/6884512210/il_fullxfull.6884512210_aivz.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 126,
      product_name: 'Grunge Pentagram Serpentine Skull Sword Beaded Necklace | Gothic | Alternative',
      description: 'This necklace is lightweight and comfortable to wear. The necklace is a mix of Stainless Steel and Nickel free alloy so keep away from high humidity and water. The piece is between 16-17 inches in length.',
      price: 17.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/d33073/6207131385/il_fullxfull.6207131385_fq1o.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 127,
      product_name: 'Whimsigoth Bronze Floral Hand Boutique Lily of the Valley Necklace | Whimsical | Floral Jewelry |',
      description: 'Lily of the valley bronze necklace! Beautiful combination of bronze and pearl!  Keep away from high moisture areas  Length 17-18in',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/1ff9fa/6940306574/il_fullxfull.6940306574_1d6j.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 128,
      product_name: 'Whimsigoth Mushroom Auburn Beaded necklace in Bronze | Fairycore | Whimsicle | naturalist |',
      description: 'This is a one of a kind auburn beaded necklace choker! The fed and bronze combination is beautifu. This necklace is handmade and quick shipping!  Each necklace will have different unique color variations and sizes - Around 17-18 inches',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/a8cd8a/6720314840/il_fullxfull.6720314840_hekl.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 129,
      product_name: 'Whimsigoth Floral Lily Dragonfly Flower Dangling Earrings in Bronze| Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with an acrylic lily flower. These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible.',
      price: 14.75,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/6d116a/6603688532/il_fullxfull.6603688532_kmuf.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 130,
      product_name: 'Whimsigoth Floral Lucite Flower Dangling Earrings in Bronze | Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with an acrylic lucite flower.  These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible and we take custom orders as well just message if interested.',
      price: 12.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/15e2bd/5655234234/il_fullxfull.5655234234_ko8n.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 131,
      product_name: 'Sunflower Glass Beaded necklace in Gold | Fairycore | Whimsigoth | Wicca |',
      description: 'This is a one of a kind glass beaded necklace with sunflower pendant! The champagne and gold tone combination is beautiful. Necklace has glass beads paired with a sunflower pendant-',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/598879/6649641973/il_fullxfull.6649641973_j69b.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 132,
      product_name: 'Whimsigoth Floral Bouquet Flower Dangling Rose Gold Earrings  | Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with an acrylic flower.  These are SUPER lightweight and so beautiful:) Perfect for any day wear or a special occasion. We ship as fast as possible and we take custom orders as well just message if interested.',
      price: 12.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/3adce8/6965526385/il_fullxfull.6965526385_ndin.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 133,
      product_name: 'Whimsigoth Carnelian Chandelier Sun Pendant Earrings in Gold | Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with genuine sodalite crystal and sun pendant in silver.  Perfect for any day wear or a special occasion.',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/43358d/6917552020/il_fullxfull.6917552020_mwjp.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 134,
      product_name: 'Sunflower Glass Beaded necklace in Gold | Fairycore | Whimsigoth | Wicca |',
      description: 'This is a one of a kind glass beaded necklace with sun pendant! The pearl and gold tone combination is beautiful. Necklace has glass beads paired with a sunflower pendant-',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/17ce2f/6668331741/il_fullxfull.6668331741_guww.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 135,
      product_name: 'Bronze Ankh Cord Necklace- large size',
      description: 'Bronze Ankh pendent on a dark brown cord necklace-  The ankh symbol is from ancient Egyptian culture and thought of as " the key of life " and represents eternal life. Symbol of healing properties and associated with strength and prosperity, the ankh is said to be the first--or original--cross.  Ready to ship — also available in silver tone',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/9da1df/4455816823/il_fullxfull.4455816823_8442.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 136,
      product_name: 'Pearlescent Large Dangling Earrings in bronze',
      description: 'These are cute and dainty pair of earrings and perfect for any occasion. Light weight and easy to wear on the ear.  "Sold separate from necklace "   Ready to ship Free shipping with orders over $35',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/c60eb3/4408536008/il_fullxfull.4408536008_de44.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 137,
      product_name: 'Whimsigoth Auburn and Amethyst Bronze Sun Beaded Necklace with Sun & Leaf Accents | Celestial | Whimsical | Vampy Goth |',
      description: 'This necklace is nickel free bronze with beautiful auburn glass beads and authentic amethyst beads. Handmade and lightweight. Jewelry Care! Keep away from moisture and water to keep metal from tarnish 💚',
      price: 19.95,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/2fcf4d/6801895633/il_fullxfull.6801895633_blna.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 138,
      product_name: 'Whimsigoth Sodalite Chandelier Sun Pendant Earrings in Silver | Fairycore | Whimsical',
      description: 'These dangling earrings are chandelier style with genuine sodalite crystal and sun pendant in silver.  Perfect for any day wear or a special occasion.',
      price: 12.0,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/bf48af/5461134046/il_fullxfull.5461134046_a74t.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 139,
      product_name: 'Whimsigoth Pink Lily and White Daisy Beaded Necklace in Silver with Green Accents | Fairycore | Naturalist',
      description: 'This is a one of a kind statement piece beaded necklace! The pink and silver combination is beautiful. This necklace is handmade and quick shipping!  17" length',
      price: 18.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/22127e/6581291512/il_fullxfull.6581291512_i33n.jpg',
      fk_category_id: null,
    },
  }),
  prisma.product.create({
    data: {
      product_id: 140,
      product_name: 'Tree of life 18k Gold Stainless Steel aventurine crystal necklace',
      description: 'This is our green aventurine crystal necklace in our tree of life design in gold tones. Quality rope style chain thats 18" long.  Aventurine Metaphysical Properties Think bountiful. Think practical enthusiasm. This stone is believed to be a positive stone of prosperity, diffusing negative emotions, reinforcing leadership, promoting compassion and encouraging perseverance.',
      price: 16.5,
      inventory: 1,
      prod_image_url: 'https://i.etsystatic.com/34112083/r/il/d8d3c6/4012093487/il_fullxfull.4012093487_4t3l.jpg',
      fk_category_id: null,
    },
  }),
]);

  // Create an order
  const order = await prisma.orders.create({
    data: {
      order_date: new Date(),
      total_price: 124.98,
      order_status: 'Processing',
      fk_ship_address_id: shippingAddress.address_id,
      fk_bill_address_id: billingAddress.address_id,
      fk_customer_id: customer.customer_id,
    },
  });

  // Create order items
  await prisma.order_item.createMany({
    data: [
      {
        fk_order_id: order.order_id,
        fk_product_id: products[0].product_id,
        quantity: 1,
        price: 89.99,
      },
      {
        fk_order_id: order.order_id,
        fk_product_id: products[1].product_id,
        quantity: 1,
        price: 34.99,
      },
    ],
  });

  // Create invoice
  const invoice = await prisma.invoice.create({
    data: {
      fk_order_id: order.order_id,
      invoice_number: 'INV-001',
      invoice_date: new Date(),
      total_price: 124.98,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      payment_status: 'paid',
    },
  });

  // Create payment
  await prisma.payment.create({
    data: {
      fk_invoice_id: invoice.invoice_id,
      payment_method: 'Credit Card',
      payment_date: new Date(),
      amount_paid: 124.98,
    },
  });

  // Create shipping record
  await prisma.shipping.create({
    data: {
      fk_order_id: order.order_id,
      fk_shipping_address_id: shippingAddress.address_id,
      tracking_num: 'TRK123456789',
      carrier: 'USPS',
      shipping_status: 'shipped',
    },
  });

  console.log('Seed completed successfully!');
  console.log({
    customers: 1,
    addresses: 2,
    categories: categories.length,
    products: products.length,
    orders: 1,
  });
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });